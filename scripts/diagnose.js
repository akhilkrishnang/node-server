const fs = require('fs');
const path = require('path');

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('🔍 Node.js API Server Diagnostics\n');
console.log('═══════════════════════════════════════════════════════════\n');

let issues = [];
let warnings = [];

// 1. Node.js Version
console.log('1️⃣  Node.js Version:');
console.log(`   ✓ ${process.version}\n`);

// 2. Current Working Directory
console.log('2️⃣  Current Working Directory:');
const cwd = process.cwd();
console.log(`   ✓ ${cwd}\n`);

// 3. Check package.json
console.log('3️⃣  package.json:');
if (fs.existsSync('package.json')) {
  console.log('   ✓ Found\n');
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('package.json is missing');
}

// 4. Check src folder
console.log('4️⃣  src/ Folder:');
if (fs.existsSync('src')) {
  console.log('   ✓ Found');
  const srcFiles = fs.readdirSync('src');
  console.log(`   Files: ${srcFiles.join(', ')}\n`);
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/ folder is missing');
}

// 5. Check src/index.js
console.log('5️⃣  src/index.js:');
if (fs.existsSync('src/index.js')) {
  const stats = fs.statSync('src/index.js');
  console.log(`   ✓ Found (${stats.size} bytes)\n`);
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/index.js is missing');
}

// 6. Check src/config
console.log('6️⃣  src/config/ Folder:');
if (fs.existsSync('src/config')) {
  console.log('   ✓ Found');
  const configFiles = fs.readdirSync('src/config');
  console.log(`   Files: ${configFiles.join(', ')}\n`);
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/config/ folder is missing');
}

// 7. Check src/components
console.log('7️⃣  src/components/ Folder:');
if (fs.existsSync('src/components')) {
  console.log('   ✓ Found');
  const components = fs.readdirSync('src/components');
  console.log(`   Components: ${components.join(', ')}\n`);
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/components/ folder is missing');
}

// 8. Check the_happy_hive component
console.log('8️⃣  src/components/the_happy_hive/:');
if (fs.existsSync('src/components/the_happy_hive')) {
  console.log('   ✓ Found');
  const compFiles = fs.readdirSync('src/components/the_happy_hive');
  compFiles.forEach(file => {
    const filePath = path.join('src/components/the_happy_hive', file);
    const stat = fs.statSync(filePath);
    console.log(`     - ${file} (${stat.size} bytes)`);
  });
  console.log('');
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/components/the_happy_hive/ folder is missing');
}

// 9. Check routes.js specifically
console.log('9️⃣  src/components/the_happy_hive/routes.js:');
if (fs.existsSync('src/components/the_happy_hive/routes.js')) {
  console.log('   ✓ Found\n');
  try {
    const routesPath = path.join(__dirname, '../src/components/the_happy_hive/routes.js');
    require(routesPath);
    console.log('   ✓ Can be loaded\n');
  } catch (e) {
    console.log(`   ⚠️  Cannot load: ${e.message}\n`);
    warnings.push('routes.js cannot be loaded: ' + e.message);
  }
} else {
  console.log('   ✗ NOT FOUND\n');
  issues.push('src/components/the_happy_hive/routes.js is missing');
}

// 10. Check node_modules
console.log('🔟 node_modules/ Installation:');
if (fs.existsSync('node_modules')) {
  console.log('   ✓ Found');
  const pkgCount = fs.readdirSync('node_modules').length;
  console.log(`   Packages installed: ${pkgCount}`);
  
  const required = ['express', 'cors', 'dotenv', 'mysql2'];
  const missing = [];
  required.forEach(pkg => {
    if (!fs.existsSync(`node_modules/${pkg}`)) {
      missing.push(pkg);
    }
  });
  
  if (missing.length > 0) {
    console.log(`   ✗ Missing packages: ${missing.join(', ')}\n`);
    issues.push(`Missing npm packages: ${missing.join(', ')}`);
  } else {
    console.log('   ✓ All required packages found\n');
  }
} else {
  console.log('   ✗ NOT FOUND\n');
  console.log('   Run: npm install --production\n');
  issues.push('node_modules/ not installed - Run: npm install --production');
}

// 11. Check .env
console.log('1️⃣1️⃣ .env Configuration:');
if (fs.existsSync('.env')) {
  console.log('   ✓ Found');
  const envContent = fs.readFileSync('.env', 'utf-8');
  const lines = envContent.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  lines.forEach(line => {
    const [key] = line.split('=');
    if (key === 'DB_PASSWORD') {
      console.log(`     - ${key}=***`);
    } else {
      console.log(`     - ${line}`);
    }
  });
  console.log('');
} else {
  console.log('   ⚠️  NOT FOUND (using defaults)\n');
  warnings.push('.env file not found - using default environment variables');
}

// 12. Check migrations
console.log('1️⃣2️⃣ migrations/ Folder:');
if (fs.existsSync('migrations')) {
  console.log('   ✓ Found');
  const migrations = fs.readdirSync('migrations');
  console.log(`   Files: ${migrations.join(', ')}\n`);
} else {
  console.log('   ⚠️  NOT FOUND\n');
  warnings.push('migrations/ folder not found');
}

// Summary
console.log('═══════════════════════════════════════════════════════════\n');
console.log('📋 SUMMARY\n');

if (issues.length === 0 && warnings.length === 0) {
  console.log('✅ Everything looks good! Try running: npm start\n');
  process.exit(0);
}

if (issues.length > 0) {
  console.log('❌ CRITICAL ISSUES (Must Fix):\n');
  issues.forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS (Should Address):\n');
  warnings.forEach((warning, i) => {
    console.log(`   ${i + 1}. ${warning}`);
  });
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════\n');

if (issues.length > 0) {
  console.log('🆘 TO FIX:\n');
  console.log('1. Ensure the ZIP was extracted properly (no nested "dist/" folder)\n');
  console.log('2. Verify your directory structure:\n');
  console.log('   /your/project/\n');
  console.log('   ├── src/\n');
  console.log('   ├── migrations/\n');
  console.log('   ├── package.json\n');
  console.log('   └── .env\n');
  console.log('3. Run: npm install --production\n');
  console.log('4. Run: npm run diagnose (again)\n');
  process.exit(1);
}

process.exit(0);
