import { api } from "encore.dev/api";
import { Header } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";

interface UpdatePostParams {
  authorization?: Header<"Authorization">;
  id: number;
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  status?: 'draft' | 'published';
  category_ids?: number[];
  tag_ids?: number[];
}

interface UpdatePostResponse {
  success: boolean;
}

// Updates an existing blog post.
export const updatePost = api<UpdatePostParams, UpdatePostResponse>(
  { expose: true, method: "PUT", path: "/admin/posts/:id" },
  async ({ authorization, id, title, content, excerpt, featured_image, meta_title, meta_description, status, category_ids, tag_ids }) => {
    const user = await requireAuth(authorization);

    // Build dynamic update query
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      params.push(title);
      paramIndex++;
    }

    if (content !== undefined) {
      updates.push(`content = $${paramIndex}`);
      params.push(content);
      paramIndex++;
    }

    if (excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex}`);
      params.push(excerpt);
      paramIndex++;
    }

    if (featured_image !== undefined) {
      updates.push(`featured_image = $${paramIndex}`);
      params.push(featured_image);
      paramIndex++;
    }

    if (meta_title !== undefined) {
      updates.push(`meta_title = $${paramIndex}`);
      params.push(meta_title);
      paramIndex++;
    }

    if (meta_description !== undefined) {
      updates.push(`meta_description = $${paramIndex}`);
      params.push(meta_description);
      paramIndex++;
    }

    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;

      if (status === 'published') {
        updates.push(`published_at = $${paramIndex}`);
        params.push(new Date());
        paramIndex++;
      }
    }

    updates.push(`updated_at = $${paramIndex}`);
    params.push(new Date());
    paramIndex++;

    if (updates.length > 1) { // More than just updated_at
      const query = `
        UPDATE posts 
        SET ${updates.join(', ')}
        WHERE id = $${paramIndex}
      `;
      params.push(id);

      await adminDB.rawExec(query, ...params);
    }

    // Update categories if provided
    if (category_ids !== undefined) {
      await adminDB.exec`DELETE FROM post_categories WHERE post_id = ${id}`;
      for (const categoryId of category_ids) {
        await adminDB.exec`
          INSERT INTO post_categories (post_id, category_id)
          VALUES (${id}, ${categoryId})
        `;
      }
    }

    // Update tags if provided
    if (tag_ids !== undefined) {
      await adminDB.exec`DELETE FROM post_tags WHERE post_id = ${id}`;
      for (const tagId of tag_ids) {
        await adminDB.exec`
          INSERT INTO post_tags (post_id, tag_id)
          VALUES (${id}, ${tagId})
        `;
      }
    }

    return { success: true };
  }
);
