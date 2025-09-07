#!/usr/bin/env node

// Clean build script to ensure no cached files interfere
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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