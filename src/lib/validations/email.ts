import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  message: z.string().min(1, "Message is required").max(5000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().max(100).optional(),
});

export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const sendEmailSchema = z.object({
  to: z.string().email("Invalid recipient email"),
  subject: z.string().min(1, "Subject is required").max(200),
  html: z.string().min(1, "HTML content is required"),
});

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  company: z.string().min(1, "Company is required").max(100),
  website: z.string().min(1, "Website is required").max(500),
  message: z.string().max(5000).optional(),
});

export const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().max(100).optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().default(""),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type SendEmailInput = z.infer<typeof sendEmailSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
