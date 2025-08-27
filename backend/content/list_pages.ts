import { api } from "encore.dev/api";
import { contentDB } from "./db";
import type { Page } from "./types";

interface ListPagesResponse {
  pages: Page[];
}

// Retrieves all pages for the website.
export const listPages = api<void, ListPagesResponse>(
  { expose: true, method: "GET", path: "/pages" },
  async () => {
    const pages = await contentDB.queryAll<Page>`
      SELECT * FROM pages 
      WHERE status = 'published'
      ORDER BY created_at DESC
    `;
    return { pages };
  }
);
