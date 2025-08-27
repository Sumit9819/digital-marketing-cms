import { api } from "encore.dev/api";
import { Header } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";

interface UpdateContactStatusParams {
  authorization?: Header<"Authorization">;
  id: number;
  status: 'new' | 'contacted' | 'closed';
}

interface UpdateContactStatusResponse {
  success: boolean;
}

// Updates the status of a contact submission.
export const updateContactStatus = api<UpdateContactStatusParams, UpdateContactStatusResponse>(
  { expose: true, method: "PUT", path: "/admin/contacts/:id/status" },
  async ({ authorization, id, status }) => {
    await requireAuth(authorization);

    await adminDB.exec`
      UPDATE contact_submissions 
      SET status = ${status}
      WHERE id = ${id}
    `;

    return { success: true };
  }
);
