import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { contentDB } from "./db";
import type { CaseStudy, User } from "./types";

interface ListCaseStudiesParams {
  service_type?: Query<string>;
}

interface CaseStudyWithAuthor extends CaseStudy {
  author: User;
}

interface ListCaseStudiesResponse {
  case_studies: CaseStudyWithAuthor[];
}

// Retrieves published case studies, optionally filtered by service type.
export const listCaseStudies = api<ListCaseStudiesParams, ListCaseStudiesResponse>(
  { expose: true, method: "GET", path: "/case-studies" },
  async ({ service_type }) => {
    let query = `
      SELECT cs.*, u.name as author_name, u.email as author_email, u.role as author_role
      FROM case_studies cs
      JOIN users u ON cs.author_id = u.id
      WHERE cs.status = 'published'
    `;
    
    const params: any[] = [];
    
    if (service_type) {
      query += ` AND cs.service_type = $1`;
      params.push(service_type);
    }
    
    query += ` ORDER BY cs.published_at DESC`;

    const caseStudies = await contentDB.rawQueryAll<any>(query, ...params);

    const caseStudiesWithAuthor: CaseStudyWithAuthor[] = caseStudies.map(cs => ({
      ...cs,
      author: {
        id: cs.author_id,
        name: cs.author_name,
        email: cs.author_email,
        role: cs.author_role,
        created_at: new Date(),
        updated_at: new Date()
      }
    }));

    return { case_studies: caseStudiesWithAuthor };
  }
);
