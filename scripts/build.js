const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = 'dist';
const DIST_ARCHIVE = 'node-server-dist.zip';

console.log('🔨 Building distribution package...\n');

// Step 1: Clean up existing dist folder
if (fs.existsSync(DIST_DIR)) {
  console.log('Cleaning up existing dist folder...');
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}

// Step 2: Create dist folder structure
console.log('Creating dist folder structure...');
fs.mkdirSync(DIST_DIR, { recursive: true });

// Step 3: Copy essential files and folders
const filesToCopy = [
  { src: 'src', dest: path.join(DIST_DIR, 'src') },
  { src: 'migrations', dest: path.join(DIST_DIR, 'migrations') },
  { src: 'scripts', dest: path.join(DIST_DIR, 'scripts') },
  { src: 'package.json', dest: path.join(DIST_DIR, 'package.json') },
  { src: 'package-lock.json', dest: path.join(DIST_DIR, 'package-lock.json') },
  { src: 'README.md', dest: path.join(DIST_DIR, 'README.md') },
  { src: 'DATABASE_SETUP.md', dest: path.join(DIST_DIR, 'DATABASE_SETUP.md') },
  { src: 'LINUX_TROUBLESHOOTING.md', dest: path.join(DIST_DIR, 'LINUX_TROUBLESHOOTING.md') },
  { src: 'NPM_SCRIPTS_GUIDE.md', dest: path.join(DIST_DIR, 'NPM_SCRIPTS_GUIDE.md') }
];

filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      console.log(`  📁 Copying ${src}/...`);
      copyDirRecursive(src, dest);
    } else {
      console.log(`  📄 Copying ${src}...`);
      fs.copyFileSync(src, dest);
    }
  } else {
    console.warn(`  ⚠️  ${src} not found, skipping...`);
  }
});

// Step 4: Create .env.example (template)
console.log('Creating .env.example template...');
const envExample = `PORT=3000
NODE_ENV=production

# Database Configuration
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=happy_hive
DB_CONNECTION_LIMIT=10
`;
fs.writeFileSync(path.join(DIST_DIR, '.env.example'), envExample);

// Step 5: Create deployment guide
console.log('Creating DEPLOYMENT.md...');
const deploymentGuide = `# Deployment Guide

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server running and accessible
- npm installed

## Steps to Deploy

### 1. Extract the Archive
\`\`\`bash
unzip node-server-dist.zip
cd dist
\`\`\

### 2. Install Dependencies
\`\`\`bash
npm install --production
\`\`\`

### 3. Configure Environment
Copy \`.env.example\` to \`.env\` and update with your database credentials:
\`\`\`bash
cp .env.example .env
\`\`\`

Then edit \`.env\` with your MySQL connection details:
\`\`\`env
DB_HOST=your-server-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=happy_hive
\`\`\`

### 4. Create Database Schema
Run the migration script to set up your database:
\`\`\`bash
mysql -u your-username -p < migrations/001_create_items_table.sql
\`\`\`

Or use phpMyAdmin to import the SQL file.

### 5. Start the Server
\`\`\`bash
npm start
\`\`\`

The API will be accessible at \`http://your-server:3000\`

## Running in Background

### Using PM2 (Recommended)
\`\`\`bash
npm install -g pm2
pm2 start src/index.js --name "node-api"
pm2 save
pm2 startup
\`\`\`

### Using Systemd (Linux)
Create \`/etc/systemd/system/node-api.service\`:
\`\`\`ini
[Unit]
Description=Node API Server
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/project
ExecStart=/usr/bin/node src/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
\`\`\`

Then start:
\`\`\`bash
sudo systemctl enable node-api
sudo systemctl start node-api
\`\`\`

### Using nohup (Simple Background)
\`\`\`bash
nohup npm start > server.log 2>&1 &
\`\`\`

## Verification

Check if server is running:
\`\`\`bash
curl http://localhost:3000/health
\`\`\`

Expected response:
\`\`\`json
{ "status": "API Server is running", "environment": "production" }
\`\`\`

## Logs

View application logs:
\`\`\`bash
# PM2
pm2 logs

# Systemd
sudo journalctl -u node-api -f

# nohup
tail -f server.log
\`\`\`

## Troubleshooting

### Server fails to start
1. Check if port 3000 is available: \`netstat -an | grep 3000\`
2. Verify Node.js is installed: \`node --version\`
3. Check logs for errors

### Database connection error
1. Verify MySQL is running and accessible
2. Confirm \`.env\` has correct database credentials
3. Ensure database and table are created

### Port already in use
Change PORT in \`.env\` or kill the process: \`kill -9 <PID>\`

## Security Checklist

- [ ] Use strong database password
- [ ] Set NODE_ENV=production
- [ ] Use firewall to restrict access to port 3000
- [ ] Keep dependencies updated
- [ ] Use HTTPS/TLS for remote connections
- [ ] Regularly backup your database
`;

fs.writeFileSync(path.join(DIST_DIR, 'DEPLOYMENT.md'), deploymentGuide);

// Step 6: Create ZIP file
console.log('\nCreating ZIP archive...');
try {
  // Using native archiving tools
  if (process.platform === 'win32') {
    // Windows PowerShell - compress contents, not the dist folder itself
    execSync(`powershell -Command "Compress-Archive -Path ${DIST_DIR}/* -DestinationPath ${DIST_ARCHIVE} -Force"`, { stdio: 'inherit' });
  } else {
    // Linux/Mac zip command - compress contents, not the dist folder itself
    execSync(`cd ${DIST_DIR} && zip -r ../${DIST_ARCHIVE} . && cd ..`, { stdio: 'inherit' });
  }
  console.log(`\n✅ Distribution package created: ${DIST_ARCHIVE}`);
} catch (error) {
  console.error(`❌ Failed to create ZIP: ${error.message}`);
  console.log('\n📦 Dist folder is ready in ./dist (you can manually compress it)');
}

// Step 7: Summary
console.log('\n📋 Summary:');
console.log(`  Distribution folder: ${DIST_DIR}/`);
console.log(`  Archive file: ${DIST_ARCHIVE}`);
console.log('\n🚀 To deploy:');
console.log(`  1. Upload ${DIST_ARCHIVE} to your server`);
console.log(`  2. Extract and follow DEPLOYMENT.md for setup instructions`);

// Helper function to copy directories recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // Skip node_modules and .git
    if (file === 'node_modules' || file === '.git' || file === 'dist') {
      return;
    }

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
