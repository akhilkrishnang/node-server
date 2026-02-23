-- Create database if not exists
CREATE DATABASE IF NOT EXISTS happy_hive;
USE happy_hive;

-- Drop table if exists (for fresh setup)
DROP TABLE IF EXISTS hive;

-- Create hive table for the-happy-hive component
CREATE TABLE hive (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dept VARCHAR(100),
  about TEXT,
  dob DATE,
  dp_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_dp_id (dp_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO hive (name, dept, about, dob, dp_id) VALUES
('John Doe', 'Engineering', 'Senior Developer', '1990-05-15', 'dp_0001'),
('Jane Smith', 'Design', 'UI/UX Designer', '1992-08-22', 'dp_0002'),
('Michael Johnson', 'Marketing', 'Marketing Manager', '1988-03-10', 'dp_0003'),
('Sarah Williams', 'Sales', 'Sales Executive', '1995-07-18', 'dp_0004'),
('Robert Brown', 'Finance', 'Financial Analyst', '1991-11-25', 'dp_0005'),
('Emily Davis', 'HR', 'Human Resources Specialist', '1993-09-12', 'dp_0006'),
('James Wilson', 'Engineering', 'Full Stack Developer', '1989-06-30', 'dp_0007'),
('Lisa Anderson', 'Operations', 'Operations Manager', '1987-02-14', 'dp_0008'),
('David Martinez', 'Engineering', 'QA Engineer', '1994-12-05', 'dp_0009'),
('Jennifer Taylor', 'Design', 'Graphic Designer', '1996-04-22', 'dp_0010'),
('Christopher Lee', 'Marketing', 'Content Strategist', '1992-01-08', 'dp_0011'),
('Amanda White', 'Finance', 'Accountant', '1994-08-19', 'dp_0012');

-- Update department with random city names
UPDATE hive SET dept = CASE id
  WHEN 1 THEN 'New York'
  WHEN 2 THEN 'San Francisco'
  WHEN 3 THEN 'Los Angeles'
  WHEN 4 THEN 'Chicago'
  WHEN 5 THEN 'Houston'
  WHEN 6 THEN 'Phoenix'
  WHEN 7 THEN 'Philadelphia'
  WHEN 8 THEN 'San Antonio'
  WHEN 9 THEN 'San Diego'
  WHEN 10 THEN 'Dallas'
  WHEN 11 THEN 'Austin'
  WHEN 12 THEN 'Seattle'
  ELSE dept
END;

-- Update about with random hobbies (1 or 2 hobbies per person)
UPDATE hive SET about = CASE id
  WHEN 1 THEN 'Reading, Hiking'
  WHEN 2 THEN 'Photography'
  WHEN 3 THEN 'Cooking, Gaming'
  WHEN 4 THEN 'Yoga'
  WHEN 5 THEN 'Painting, Music'
  WHEN 6 THEN 'Traveling'
  WHEN 7 THEN 'Swimming, Drawing'
  WHEN 8 THEN 'Gardening'
  WHEN 9 THEN 'Dancing, Running'
  WHEN 10 THEN 'Writing'
  WHEN 11 THEN 'Cycling, Cooking'
  WHEN 12 THEN 'Chess'
  ELSE about
END;
