-- Insert JWT secret setting
INSERT INTO site_settings (key, value) VALUES
('jwt_secret', 'your-super-secret-jwt-key-change-this-in-production-please-make-it-long-and-random')
ON CONFLICT (key) DO NOTHING;
