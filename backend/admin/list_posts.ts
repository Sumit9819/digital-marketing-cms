import { api } from "encore.dev/api";
import { Header, Query } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";
import type { Post, Category, Tag, User } from "../content/types";

interface ListAdminPostsParams {
  authorization?: Header<"Authorization">;
  limit?: Query<number>;
  offset?: Query<number>;
  status?: Query<string>;
}

interface PostWithDetails extends Post {
  categories: Category[];
  tags: Tag[];
  author: User;
}

interface ListAdminPostsResponse {
  posts: PostWithDetails[];
  total: number;
}

// Retrieves all blog posts for admin management.
export const listAdminPosts = api<ListAdminPostsParams, ListAdminPostsResponse>(
  { expose: true, method: "GET", path: "/admin/posts" },
  async ({ authorization, limit = 10, offset = 0, status }) => {
    await requireAuth(authorization);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND p.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const query = `
      SELECT p.*, u.name as author_name, u.email as author_email, u.role as author_role
      FROM posts p
      JOIN users u ON p.author_id = u.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM posts p
      ${whereClause}
    `;

    params.push(limit, offset);

    const posts = await adminDB.rawQueryAll<any>(query, ...params);
    const countResult = await adminDB.rawQueryRow<{ total: number }>(countQuery, ...params.slice(0, -2));

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of posts) {
      // Get categories
      const categories = await adminDB.queryAll<Category>`
        SELECT c.* FROM categories c
        JOIN post_categories pc ON c.id = pc.category_id
        WHERE pc.post_id = ${post.id}
      `;

      // Get tags
      const tags = await adminDB.queryAll<Tag>`
        SELECT t.* FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = ${post.id}
      `;

      postsWithDetails.push({
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
      });
    }

    return {
      posts: postsWithDetails,
      total: countResult?.total || 0
    };
  }
);
