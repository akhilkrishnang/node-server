-- Migration for spotlight table (002_create_spotlight_table.sql)

USE happy_hive;

-- Create spotlight table
CREATE TABLE IF NOT EXISTS spotlight (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL,
  type VARCHAR(100) NOT NULL,
  expiry DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_expiry (expiry),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO spotlight (description, type, expiry) VALUES
('Congratulations to Sarah for winning the regional award!', 'accolades', '2026-03-31'),
('New community project launch coming next month', 'announcements', '2026-03-15'),
('Spring cleanup event this weekend', 'events', '2026-02-25');
