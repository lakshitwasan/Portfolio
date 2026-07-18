import { z } from "zod";

/** Shared by the client form and the API route so validation stays in sync. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  message: z.string().trim().min(10, "Tell me a little more (min 10 characters)").max(2000),
  // Honeypot: real users never fill this; bots often do. Accepted by the schema so
  // the API route can silently discard it (see app/api/contact/route.ts).
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
