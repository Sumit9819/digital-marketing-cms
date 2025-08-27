export interface User {
  id: number;
  email: string;
  role: 'administrator' | 'editor' | 'author';
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published';
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: Date;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published';
  published_at?: Date;
  author_id: number;
  created_at: Date;
  updated_at: Date;
  categories?: Category[];
  tags?: Tag[];
  author?: User;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  key_metrics?: Record<string, any>;
  featured_image?: string;
  service_type?: string;
  status: 'draft' | 'published';
  published_at?: Date;
  author_id: number;
  created_at: Date;
  updated_at: Date;
  author?: User;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: Date;
}

export interface MediaFile {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
  alt_text?: string;
  uploaded_by: number;
  created_at: Date;
}

export interface SiteSetting {
  key: string;
  value?: string;
  updated_at: Date;
}
