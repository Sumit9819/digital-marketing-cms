import { api } from "encore.dev/api";
import { contentDB } from "./db";
import type { Category } from "./types";

interface ListCategoriesResponse {
  categories: Category[];
}

// Retrieves all blog categories.
export const listCategories = api<void, ListCategoriesResponse>(
  { expose: true, method: "GET", path: "/categories" },
  async () => {
    const categories = await contentDB.queryAll<Category>`
      SELECT * FROM categories ORDER BY name ASC
    `;
    return { categories };
  }
);
