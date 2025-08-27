import { api, APIError } from "encore.dev/api";
import { contentDB } from "./db";
import type { Post, Category, Tag, User } from "./types";

interface GetPostParams {
  slug: string;
}

interface PostWithDetails extends Post {
  categories: Category[];
  tags: Tag[];
  author: User;
}

// Retrieves a single blog post by its slug.
export const getPost = api<GetPostParams, PostWithDetails>(
  { expose: true, method: "GET", path: "/posts/:slug" },
  async ({ slug }) => {
    const post = await contentDB.queryRow<any>`
      SELECT p.*, u.name as author_name, u.email as author_email, u.role as author_role
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.slug = ${slug} AND p.status = 'published'
    `;
    
    if (!post) {
      throw APIError.notFound("post not found");
    }

    // Get categories
    const categories = await contentDB.queryAll<Category>`
      SELECT c.* FROM categories c
      JOIN post_categories pc ON c.id = pc.category_id
      WHERE pc.post_id = ${post.id}
    `;

    // Get tags
    const tags = await contentDB.queryAll<Tag>`
      SELECT t.* FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ${post.id}
    `;
    
    return {
      ...post,
      categories,
      tags,
      author: {
        id: post.author_id,
        name: post.author_name,
        email: post.author_email,
        role: post.author_role,
        created_at: new Date(),
        updated_at: new Date()
      }
    };
  }
);
