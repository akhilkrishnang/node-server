# Linux Server Troubleshooting Guide

## Error: Cannot find module './components/the-happy-hive/routes'

This typically happens when:
1. Files weren't extracted properly
2. node_modules aren't installed
3. Wrong working directory

## Step-by-step Troubleshooting

### 1. Verify Directory Structure
Run these commands on your Linux server:

```bash
# Check if files exist
ls -la src/components/the-happy-hive/

# Should show:
# -rw-r--r-- ... controller.js
# -rw-r--r-- ... routes.js
# -rw-r--r-- ... service.js
```

### 2. Check Current Working Directory
```bash
pwd
# Should show something like: /home/akhilkri/api.akhilkrishnang.com

# If you extracted to a subdirectory, navigate there
cd /path/to/extracted/folder
```

### 3. Install Dependencies
```bash
npm install --production
# This creates node_modules/ folder with all required packages
```

### 4. Verify package.json
```bash
cat package.json | grep -A 5 "dependencies"
# Should show mysql2, express, cors, dotenv
```

### 5. Check File Permissions
```bash
# Ensure all files are readable
chmod -R 755 src/
ls -la src/components/the-happy-hive/routes.js
```

### 6. Test Require Path Directly
```bash
node -e "console.log(require.resolve('./src/components/the-happy-hive/routes'))"
```

## Correct Directory Structure

After extraction, your structure should be:

```
/home/akhilkri/api.akhilkrishnang.com/
├── src/
│   ├── index.js
│   ├── config/
│   │   └── database.js
│   └── components/
│       └── the-happy-hive/
│           ├── routes.js
│           ├── controller.js
│           └── service.js
├── migrations/
│   └── 001_create_items_table.sql
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── README.md
├── DATABASE_SETUP.md
└── DEPLOYMENT.md
```

NOT this (incorrect):
```
/home/akhilkri/api.akhilkrishnang.com/
├── dist/
│   ├── src/
│   ├── package.json
│   └── ...
```

## Correct Extraction

### If ZIP has nested 'dist/' folder:
```bash
unzip node-server-dist.zip
cd dist
npm install --production
npm start
```

### If ZIP contents are at root (after build script fix):
```bash
unzip node-server-dist.zip -d /home/akhilkri/api.akhilkrishnang.com/
cd /home/akhilkri/api.akhilkrishnang.com/
npm install --production
npm start
```

## Common Issues

### Issue: Permission denied
```bash
# Fix permissions
chmod 755 src/ -R
chmod 644 src/index.js
```

### Issue: node_modules missing
```bash
# Just install them
npm install --production
```

### Issue: .env missing
```bash
# Copy template
cp .env.example .env
# Edit with your credentials
nano .env
```

## Verify Server Works

```bash
# Test with curl
curl http://localhost:3000/health

# Expected response:
# {"status":"API Server is running","environment":"production"}
```

## Complete Fresh Deploy

If still having issues, do a complete fresh deploy:

```bash
# 1. Navigate to your project directory
cd /home/akhilkri/api.akhilkrishnang.com

# 2. Check structure
ls -la src/ package.json

# 3. Install fresh dependencies
rm -rf node_modules package-lock.json
npm install --production

# 4. Create .env from template
cp .env.example .env
# Edit .env with your database credentials
nano .env

# 5. Test database connection
mysql -h www.akhilkrishnang.com -u akhilkri_hive_admin -p akhilkri_happy_hive -e "SELECT 1"
# Should return: | 1 |

# 6. Run migrations if needed
mysql -h www.akhilkrishnang.com -u akhilkri_hive_admin -p < migrations/001_create_items_table.sql

# 7. Start server
npm start
```

If you still see issues, run:
```bash
node -e "console.log('Node:', process.version); console.log('CWD:', process.cwd()); console.log('Files:', require('fs').readdirSync('src/components/the-happy-hive/'))"
```

And share the output.
