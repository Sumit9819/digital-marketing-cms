import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { contentDB } from "./db";
import type { Post, Category, Tag, User } from "./types";

interface ListPostsParams {
  limit?: Query<number>;
  offset?: Query<number>;
  category?: Query<string>;
  tag?: Query<string>;
}

interface PostWithDetails extends Post {
  categories: Category[];
  tags: Tag[];
  author: User;
}

interface ListPostsResponse {
  posts: PostWithDetails[];
  total: number;
}

// Retrieves published blog posts with pagination and filtering.
export const listPosts = api<ListPostsParams, ListPostsResponse>(
  { expose: true, method: "GET", path: "/posts" },
  async ({ limit = 10, offset = 0, category, tag }) => {
    let whereClause = "WHERE p.status = 'published'";
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      whereClause += ` AND EXISTS (
        SELECT 1 FROM post_categories pc 
        JOIN categories c ON pc.category_id = c.id 
        WHERE pc.post_id = p.id AND c.slug = $${paramIndex}
      )`;
      params.push(category);
      paramIndex++;
    }

    if (tag) {
      whereClause += ` AND EXISTS (
        SELECT 1 FROM post_tags pt 
        JOIN tags t ON pt.tag_id = t.id 
        WHERE pt.post_id = p.id AND t.slug = $${paramIndex}
      )`;
      params.push(tag);
      paramIndex++;
    }

    const query = `
      SELECT p.*, u.name as author_name, u.email as author_email
      FROM posts p
      JOIN users u ON p.author_id = u.id
      ${whereClause}
      ORDER BY p.published_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM posts p
      ${whereClause}
    `;

    params.push(limit, offset);

    const posts = await contentDB.rawQueryAll<any>(query, ...params);
    const countResult = await contentDB.rawQueryRow<{ total: number }>(countQuery, ...params.slice(0, -2));

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of posts) {
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

      postsWithDetails.push({
        ...post,
        categories,
        tags,
        author: {
          id: post.author_id,
          name: post.author_name,
          email: post.author_email,
          role: 'author',
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
