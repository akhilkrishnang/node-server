# Database Setup Guide

## Prerequisites
- MySQL Server installed and running
- phpMyAdmin access (optional but recommended)
- Node.js and npm installed

## Environment Configuration

Update your `.env` file with your MySQL connection details:

```env
DB_HOST=localhost          # MySQL server host
DB_PORT=3306              # MySQL server port (default: 3306)
DB_USER=root              # MySQL username
DB_PASSWORD=              # MySQL password
DB_NAME=happy_hive        # Database name
DB_CONNECTION_LIMIT=10    # Connection pool limit
```

## Database Setup Instructions

### Option 1: Using phpMyAdmin

1. Open phpMyAdmin in your browser (usually http://localhost/phpmyadmin)
2. Click on "SQL" tab at the top
3. Copy and paste the contents of `migrations/001_create_items_table.sql`
4. Execute the SQL

### Option 2: Using MySQL Command Line

```bash
mysql -u root -p < migrations/001_create_items_table.sql
```

Or connect to MySQL and run:

```sql
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS happy_hive;
USE happy_hive;

-- Drop table if exists (for fresh setup)
DROP TABLE IF EXISTS items;

-- Create items table for the-happy-hive component
CREATE TABLE items (
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
INSERT INTO items (name, dept, about, dob, dp_id) VALUES
('John Doe', 'Engineering', 'Senior Developer', '1990-05-15', 'dp_0001'),
('Jane Smith', 'Design', 'UI/UX Designer', '1992-08-22', 'dp_0002');
```

## Table Structure

### items table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Auto-increment) | Primary key, unique identifier |
| name | VARCHAR(255) | User/item name (REQUIRED) |
| dept | VARCHAR(100) | Department name |
| about | TEXT | Description or bio |
| dob | DATE | Date of birth |
| dp_id | VARCHAR(100) | Display picture ID |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### spotlight table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Auto-increment) | Primary key, unique identifier |
| description | TEXT | Description of the spotlight (REQUIRED) |
| type | VARCHAR(100) | Type of spotlight: `stork_visit`, `accolades`, `announcements`, `events`, etc. (REQUIRED) |
| expiry | DATE | Expiration date (REQUIRED) - only non-expired spotlights are returned in public APIs |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Indexes

- items table:
  - `idx_name` on `name` column - for faster searches by name
  - `idx_dp_id` on `dp_id` column - for faster searches by display picture ID
- spotlight table:
  - `idx_type` on `type` column - for filtering by spotlight type
  - `idx_expiry` on `expiry` column - for filtering active/expired spotlights
  - `idx_created` on `created_at` column - for sorting by creation date

## Troubleshooting

### Connection Error: "Access denied for user"
- Check DB_USER and DB_PASSWORD in .env
- Verify MySQL service is running
- Ensure user has proper permissions

### Database doesn't exist
- Run the migration script to create the database
- Verify DB_NAME in .env matches the created database

### Table doesn't exist
- Run the migration script
- Check if the database was created

## Production Considerations

1. **Use a strong password** for database user
2. **Create a dedicated database user** with limited privileges (not root)
3. **Enable SSL/TLS** for remote database connections
4. **Regular backups** of your database
5. **Connection pooling** is already configured (adjust DB_CONNECTION_LIMIT as needed)

## Backup and Restore

### Backup Database
```bash
mysqldump -u root -p happy_hive > backup.sql
```

### Restore Database
```bash
mysql -u root -p happy_hive < backup.sql
```
