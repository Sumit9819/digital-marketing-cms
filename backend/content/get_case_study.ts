import { api, APIError } from "encore.dev/api";
import { contentDB } from "./db";
import type { CaseStudy, User } from "./types";

interface GetCaseStudyParams {
  slug: string;
}

interface CaseStudyWithAuthor extends CaseStudy {
  author: User;
}

// Retrieves a single case study by its slug.
export const getCaseStudy = api<GetCaseStudyParams, CaseStudyWithAuthor>(
  { expose: true, method: "GET", path: "/case-studies/:slug" },
  async ({ slug }) => {
    const caseStudy = await contentDB.queryRow<any>`
      SELECT cs.*, u.name as author_name, u.email as author_email, u.role as author_role
      FROM case_studies cs
      JOIN users u ON cs.author_id = u.id
      WHERE cs.slug = ${slug} AND cs.status = 'published'
    `;
    
    if (!caseStudy) {
      throw APIError.notFound("case study not found");
    }
    
    return {
      ...caseStudy,
      author: {
        id: caseStudy.author_id,
        name: caseStudy.author_name,
        email: caseStudy.author_email,
        role: caseStudy.author_role,
        created_at: new Date(),
        updated_at: new Date()
      }
    };
  }
);
