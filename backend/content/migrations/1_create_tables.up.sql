-- Users table for admin authentication
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'author',
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages table for static content
CREATE TABLE pages (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  author_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories for blog posts
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags for blog posts
CREATE TABLE tags (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(500),
  meta_title VARCHAR(255),
  meta_description TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  author_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post categories relationship
CREATE TABLE post_categories (
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Post tags relationship
CREATE TABLE post_tags (
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Case studies
CREATE TABLE case_studies (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  challenge TEXT,
  solution TEXT,
  results TEXT,
  key_metrics JSONB,
  featured_image VARCHAR(500),
  service_type VARCHAR(100),
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  author_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media files
CREATE TABLE media (
  id BIGSERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  uploaded_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings
CREATE TABLE site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
('site_title', 'Digital Marketing Agency'),
('site_description', 'Professional digital marketing services to grow your business'),
('contact_email', 'hello@agency.com'),
('contact_phone', '+1 (555) 123-4567'),
('address', '123 Business St, City, State 12345'),
('social_facebook', ''),
('social_twitter', ''),
('social_linkedin', ''),
('social_instagram', '');

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role, name) VALUES
('admin@agency.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'administrator', 'Admin User');

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('SEO', 'seo', 'Search Engine Optimization articles'),
('PPC', 'ppc', 'Pay-Per-Click advertising content'),
('Content Marketing', 'content-marketing', 'Content strategy and marketing'),
('Social Media', 'social-media', 'Social media marketing tips'),
('Analytics', 'analytics', 'Web analytics and data insights');

-- Insert default tags
INSERT INTO tags (name, slug) VALUES
('Google Ads', 'google-ads'),
('Facebook Ads', 'facebook-ads'),
('SEO Tips', 'seo-tips'),
('Content Strategy', 'content-strategy'),
('Lead Generation', 'lead-generation'),
('Conversion Optimization', 'conversion-optimization');
