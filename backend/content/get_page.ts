import { api, APIError } from "encore.dev/api";
import { contentDB } from "./db";
import type { Page } from "./types";

interface GetPageParams {
  slug: string;
}

// Retrieves a single page by its slug.
export const getPage = api<GetPageParams, Page>(
  { expose: true, method: "GET", path: "/pages/:slug" },
  async ({ slug }) => {
    const page = await contentDB.queryRow<Page>`
      SELECT * FROM pages 
      WHERE slug = ${slug} AND status = 'published'
    `;
    
    if (!page) {
      throw APIError.notFound("page not found");
    }
    
    return page;
  }
);
