import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/lib/content";

// Node runtime (the AWS SDK isn't Edge-compatible).
export const runtime = "nodejs";

// --- naive in-memory rate limit (per instance) ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

const TO = process.env.CONTACT_TO_EMAIL ?? profile.email;

// Email providers, in priority order:
//   1. Resend  (free, ideal on Vercel) — set RESEND_API_KEY
//   2. AWS SES (for the AWS deploy)    — set SES_FROM_EMAIL
//   3. neither — log to console so the form is still testable in dev
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
const SES_FROM = process.env.SES_FROM_EMAIL;
const AWS_REGION = process.env.AWS_REGION ?? "ap-south-1";

async function sendViaResend(name: string, email: string, ip: string, message: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

async function sendViaSes(name: string, email: string, ip: string, message: string) {
  const ses = new SESClient({ region: AWS_REGION });
  await ses.send(
    new SendEmailCommand({
      Source: SES_FROM!,
      Destination: { ToAddresses: [TO] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `Portfolio contact — ${name}` },
        Body: { Text: { Data: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}` } },
      },
    }),
  );
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages — please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — pretend success, send nothing.
  if (company) return NextResponse.json({ ok: true });

  // No provider configured (e.g. local dev): log and succeed so the UX is testable.
  if (!RESEND_API_KEY && !SES_FROM) {
    console.info("[contact] No email provider configured — message received:", { name, email, message });
    return NextResponse.json({ ok: true, delivery: "logged" });
  }

  try {
    if (RESEND_API_KEY) {
      await sendViaResend(name, email, ip, message);
    } else {
      await sendViaSes(name, email, ip, message);
    }
    return NextResponse.json({ ok: true, delivery: "email" });
  } catch (err) {
    console.error("[contact] Email send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email me directly." },
      { status: 502 },
    );
  }
}
