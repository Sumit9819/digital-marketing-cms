import { api } from "encore.dev/api";
import { Header } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAuth } from "./middleware";

interface DeletePostParams {
  authorization?: Header<"Authorization">;
  id: number;
}

interface DeletePostResponse {
  success: boolean;
}

// Deletes a blog post.
export const deletePost = api<DeletePostParams, DeletePostResponse>(
  { expose: true, method: "DELETE", path: "/admin/posts/:id" },
  async ({ authorization, id }) => {
    await requireAuth(authorization);

    await adminDB.exec`DELETE FROM posts WHERE id = ${id}`;

    return { success: true };
  }
);
