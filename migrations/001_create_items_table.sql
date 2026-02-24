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

-- Insert actual employee data
INSERT INTO hive (name, dept, about, dob, dp_id) VALUES
('Agansha Baiju', 'Kochi', NULL, '1990-09-14', NULL),
('Akhil Krishnan G', 'Cherthala', 'Photography, Art, Movies', '1990-05-22', NULL),
('Ambika M S', 'Thrikkakara', 'Sustainable Living, Travelling', '1990-03-15', NULL),
('Ananthalakshmi S', 'Kochi', NULL, '1990-12-31', NULL),
('Ananthasheshan G', 'Kochi', NULL, '1990-06-20', NULL),
('Anilda Mariya Siby', 'Kochi', NULL, '1990-10-24', NULL),
('Anirudh M Pai', 'Kochi', NULL, '1990-06-15', NULL),
('Ansel James Joseph', 'Kochi', NULL, '1990-05-01', NULL),
('Arun S Nair', 'Kochi', NULL, '1990-05-04', NULL),
('Athira Ajoy', 'Kochi', NULL, '1990-11-05', NULL),
('Basil M Jacob', 'Kochi', NULL, '1990-11-21', NULL),
('Byju Paul', 'Kochi', NULL, '1990-05-13', NULL),
('Cibi K Shanmukhan', 'Kochi', NULL, '1990-11-29', NULL),
('Deepamol K Parameswaran', 'Kochi', NULL, '1990-11-23', NULL),
('Dhanesh Krishna', 'Kochi', NULL, '1990-12-01', NULL),
('Dinumol R', 'Kochi', NULL, '1990-07-12', NULL),
('Gopikrishnan R', 'Kochi', NULL, '1990-06-07', NULL),
('Hamy Asainar', 'Kochi', NULL, '1990-10-16', NULL),
('Jibin Joy', 'Kochi', NULL, '1990-09-05', NULL),
('Jinju Raju', 'Kochi', NULL, '1990-03-09', NULL),
('John J Jacob', 'Kochi', NULL, '1990-07-27', NULL),
('Krishnamoorthy T S', 'Kochi', NULL, '1990-08-18', NULL),
('Navaneeth Ps', 'Kochi', NULL, '1990-05-05', NULL),
('Nikhil P', 'Kochi', NULL, '1990-07-27', NULL),
('Parvathy H', 'Calicut', 'Avid Reader, Passionate Foodie, Journaling', '1990-02-16', NULL),
('Rajesh M', 'Kochi', NULL, '1990-11-11', NULL),
('Ranjith K R', 'Kochi', NULL, '1990-08-11', NULL),
('Robin Jose', 'Kochi', NULL, '1990-04-17', NULL),
('Sajeeth S', 'Kochi', NULL, '1990-09-17', NULL),
('Sheena Narayanan', 'Kochi', NULL, '1990-06-16', NULL),
('Sherin Susan Georgey', 'Alappuzha', 'Reading, Gardening, Music', '1990-09-10', NULL),
('Sibin V S', 'Kochi', NULL, '1990-10-19', NULL),
('Sreelal T L', 'Kochi', NULL, '1990-05-04', NULL),
('Sunu C John', 'Kochi', NULL, '1990-09-15', NULL),
('Vishnu Narayanan O', 'Kochi', NULL, '1990-08-02', NULL),
('Vyshak O', 'Kochi', NULL, '1990-05-01', NULL);
