import { api } from "encore.dev/api";
import { Header, Query } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";
import type { ContactSubmission } from "../content/types";

interface ListContactsParams {
  authorization?: Header<"Authorization">;
  limit?: Query<number>;
  offset?: Query<number>;
  status?: Query<string>;
}

interface ListContactsResponse {
  contacts: ContactSubmission[];
  total: number;
}

// Retrieves contact form submissions for admin management.
export const listContacts = api<ListContactsParams, ListContactsResponse>(
  { expose: true, method: "GET", path: "/admin/contacts" },
  async ({ authorization, limit = 20, offset = 0, status }) => {
    await requireAuth(authorization);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const query = `
      SELECT * FROM contact_submissions
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM contact_submissions
      ${whereClause}
    `;

    params.push(limit, offset);

    const contacts = await adminDB.rawQueryAll<ContactSubmission>(query, ...params);
    const countResult = await adminDB.rawQueryRow<{ total: number }>(countQuery, ...params.slice(0, -2));

    return {
      contacts,
      total: countResult?.total || 0
    };
  }
);
