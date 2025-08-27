import { api } from "encore.dev/api";
import { contentDB } from "./db";
import { validateEmail } from "./utils";
import type { ContactSubmission } from "./types";

interface SubmitContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

interface SubmitContactResponse {
  success: boolean;
  message: string;
}

// Submits a contact form and stores it in the database.
export const submitContact = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact" },
  async ({ name, email, company, phone, message }) => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      throw new Error("Name, email, and message are required");
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email address");
    }

    await contentDB.exec`
      INSERT INTO contact_submissions (name, email, company, phone, message)
      VALUES (${name.trim()}, ${email.trim()}, ${company?.trim() || null}, ${phone?.trim() || null}, ${message.trim()})
    `;

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you soon!"
    };
  }
);
