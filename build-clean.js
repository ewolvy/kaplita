#!/usr/bin/env node

// Clean build script to ensure no cached files interfere
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning build artifacts...');

// Remove dist folder
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✓ Removed dist folder');
}

// Clear node_modules/.vite cache
const viteCachePath = path.join(__dirname, 'node_modules', '.vite');
if (fs.existsSync(viteCachePath)) {
  fs.rmSync(viteCachePath, { recursive: true, force: true });
  console.log('✓ Cleared Vite cache');
}

console.log('🔨 Building fresh version...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}