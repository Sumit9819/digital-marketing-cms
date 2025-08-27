import { api } from "encore.dev/api";
import { contentDB } from "./db";
import type { Tag } from "./types";

interface ListTagsResponse {
  tags: Tag[];
}

// Retrieves all blog tags.
export const listTags = api<void, ListTagsResponse>(
  { expose: true, method: "GET", path: "/tags" },
  async () => {
    const tags = await contentDB.queryAll<Tag>`
      SELECT * FROM tags ORDER BY name ASC
    `;
    return { tags };
  }
);
