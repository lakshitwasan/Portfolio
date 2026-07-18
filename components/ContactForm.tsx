"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Failed to send.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  const field = "w-full rounded-lg border border-line bg-ground/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";
  const errorText = "mt-1.5 text-xs text-red-500 dark:text-red-400";

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl border border-accent/40 bg-accent/[0.06] p-8">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">✓</span>
        <h3 className="font-display text-xl font-bold">Message sent</h3>
        <p className="text-sm text-ink-soft">Thanks — I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs text-accent hover:underline"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-soft">
          Name
        </label>
        <input id="name" type="text" autoComplete="name" className={field} {...register("name")} />
        {errors.name && <p className={errorText}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-soft">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" className={field} {...register("email")} />
        {errors.email && <p className={errorText}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-soft">
          Message
        </label>
        <textarea id="message" rows={5} className={`${field} resize-y`} {...register("message")} />
        {errors.message && <p className={errorText}>{errors.message.message}</p>}
      </div>

      {/* Honeypot — visually hidden, off the tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverError && (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ground transition-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
