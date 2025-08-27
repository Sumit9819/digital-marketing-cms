import { api } from "encore.dev/api";
import { Header } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";
import { generateSlug } from "../content/utils";

interface CreatePostParams {
  authorization?: Header<"Authorization">;
  title: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published';
  category_ids?: number[];
  tag_ids?: number[];
}

interface CreatePostResponse {
  id: number;
  slug: string;
}

// Creates a new blog post.
export const createPost = api<CreatePostParams, CreatePostResponse>(
  { expose: true, method: "POST", path: "/admin/posts" },
  async ({ authorization, title, content, excerpt, featured_image, meta_title, meta_description, status, category_ids = [], tag_ids = [] }) => {
    const user = await requireAuth(authorization);

    const slug = generateSlug(title);
    const published_at = status === 'published' ? new Date() : null;

    const post = await adminDB.queryRow<{ id: number }>`
      INSERT INTO posts (title, slug, content, excerpt, featured_image, meta_title, meta_description, status, published_at, author_id)
      VALUES (${title}, ${slug}, ${content}, ${excerpt}, ${featured_image}, ${meta_title}, ${meta_description}, ${status}, ${published_at}, ${user.id})
      RETURNING id
    `;

    if (!post) {
      throw new Error("Failed to create post");
    }

    // Add categories
    for (const categoryId of category_ids) {
      await adminDB.exec`
        INSERT INTO post_categories (post_id, category_id)
        VALUES (${post.id}, ${categoryId})
        ON CONFLICT DO NOTHING
      `;
    }

    // Add tags
    for (const tagId of tag_ids) {
      await adminDB.exec`
        INSERT INTO post_tags (post_id, tag_id)
        VALUES (${post.id}, ${tagId})
        ON CONFLICT DO NOTHING
      `;
    }

    return {
      id: post.id,
      slug
    };
  }
);
