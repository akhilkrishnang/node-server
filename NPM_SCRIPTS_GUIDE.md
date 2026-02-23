# Server Deployment & Troubleshooting Guide

## Available npm Scripts

After extracting on your server, you can use these npm commands **without needing shell access**:

### 1. Diagnostics (Recommended First Step)
```bash
npm run diagnose
```
**What it does**: Complete health check of your installation
- Verifies all required files exist
- Checks folder structure
- Confirms dependencies are installed
- Validates environment configuration
- Tests if modules can be loaded

**Output**: Shows ✓ for good, ✗ for missing, ⚠️ for warnings

---

### 2. Check Directory Structure
```bash
npm run check-structure
```
**What it does**: Quick verification that all folders exist
- src: ✓/✗
- src/config: ✓/✗
- src/components: ✓/✗
- src/components/the-happy-hive: ✓/✗
- migrations: ✓/✗

---

### 3. List Files
```bash
npm run list-files
```
**What it does**: Shows your complete project structure
- Lists all files and folders recursively
- Skips node_modules and .git (too verbose)
- Helps verify extraction was correct

---

### 4. Verify Dependencies
```bash
npm run verify-modules
```
**What it does**: Checks all required npm packages
- express: ✓/✗
- cors: ✓/✗
- dotenv: ✓/✗
- mysql2: ✓/✗

---

### 5. Development Mode
```bash
npm run dev
```
**What it does**: Runs server with auto-reload
- Good for testing changes
- Server restarts when you modify files
- Shows real-time logs

---

### 6. Production Mode
```bash
npm start
```
**What it does**: Runs the production server
- Standard startup
- Better performance than dev mode
- No auto-reload

---

## Deployment Checklist

### Step 1: Extract & Navigate
```bash
unzip node-server-dist.zip
cd /path/to/extracted/folder
```

### Step 2: Run Diagnostics
```bash
npm run diagnose
```
✅ If everything shows green checkmarks, skip to Step 4

❌ If you see errors, continue to Step 3

### Step 3: Fix Issues (if needed)

**If you see "node_modules not found":**
```bash
npm install --production
npm run diagnose  # Run again to verify
```

**If you see ".env not found":**
```bash
cp .env.example .env
# Then edit .env with your database credentials
# PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, etc.
npm run diagnose  # Run again to verify
```

**If you see missing files (src/, migrations/, etc.):**
- Your ZIP wasn't extracted properly
- Check that you're in the correct directory
- Run `npm run list-files` to see what's there

### Step 4: Create Database
```bash
mysql -h your-db-host -u your-db-user -p < migrations/001_create_items_table.sql
```
Or import the SQL file via phpMyAdmin

### Step 5: Test Everything
```bash
npm run diagnose
```
Should see: ✅ Everything looks good!

### Step 6: Start Server
```bash
npm start
```

---

## Troubleshooting Steps

### Scenario 1: "Cannot find module './components/the-happy-hive/routes'"

**Run these in order:**

1️⃣ **Check structure:**
```bash
npm run check-structure
```
Should show all ✓

2️⃣ **List files:**
```bash
npm run list-files
```
Look for: `src/components/the-happy-hive/` folder with `routes.js`, `controller.js`, `service.js`

3️⃣ **Full diagnosis:**
```bash
npm run diagnose
```
Read the output carefully for what's missing

4️⃣ **Reinstall if needed:**
```bash
rpm install --production
npm run diagnose
```

---

### Scenario 2: "Database connection error"

**Check in this order:**

1️⃣ **Verify .env:**
```bash
npm run diagnose
```
Look for the "11. .env Configuration" section - ensure DB credentials are correct

2️⃣ **Edit .env if needed:**
Your .env should have:
```env
PORT=3000
NODE_ENV=production
DB_HOST=your-server-ip
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=happy_hive
```

3️⃣ **Test database manually:**
```bash
mysql -h your-db-host -u your-db-user -p -e "SELECT 1"
# The password will be prompted
```
If this fails, database connection is wrong

---

### Scenario 3: "Port 3000 already in use"

Change the port in `.env`:
```env
PORT=3001  # Try a different port
```

Then start:
```bash
npm start
```

---

## Expected Success Output

When running `npm run diagnose`, you should see:

```
✓ Node.js Version: v20.x.x
✓ Current Working Directory: /home/akhilkri/api.akhilkrishnang.com
✓ package.json: Found
✓ src/ Folder: Found
✓ All required packages found
✓ .env Configuration: Found
✓ Everything looks good! Try running: npm start
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run diagnose` | Full health check |
| `npm run check-structure` | Verify folder structure |
| `npm run list-files` | Show complete file tree |
| `npm run verify-modules` | Check npm packages |
| `npm start` | Start production server |
| `npm run dev` | Start with auto-reload |

---

## Getting Help

If you see errors running:

```bash
npm run diagnose 2>&1 | tee diagnostic-output.txt
```

This saves the full output to `diagnostic-output.txt` which you can share for debugging.

---

## Notes

- All npm scripts work without shell access
- Run them from your project root directory (where package.json is)
- The diagnostics check everything the server needs to run
- Fix any ✗ issues before trying to start the server
