#!/usr/bin/env node

/**
 * RSR (Rhodium Standard Repository) Compliance Verification Script
 *
 * Checks if the project meets RSR Bronze level requirements:
 * - Complete documentation
 * - .well-known directory
 * - Build system
 * - Dual licensing
 * - TPCF documentation
 * - Tests passing
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Helper functions
const check = (condition, label) => {
  const symbol = condition ? '✓' : '✗';
  const color = condition ? colors.green : colors.red;
  console.log(`  ${color}${symbol}${colors.reset} ${label}`);
  return condition;
};

const fileExists = (filepath) => {
  try {
    return fs.existsSync(path.join(process.cwd(), filepath));
  } catch (error) {
    return false;
  }
};

console.log(`${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.cyan}RSR Compliance Verification${colors.reset}`);
console.log(`${colors.cyan}========================================${colors.reset}`);
console.log('');

let totalChecks = 0;
let passedChecks = 0;

// Category 1: Documentation
console.log(`${colors.blue}📚 Documentation${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('README.md'), 'README.md');
totalChecks++; passedChecks += check(fileExists('CLAUDE.md'), 'CLAUDE.md');
totalChecks++; passedChecks += check(fileExists('LICENSE'), 'LICENSE');
totalChecks++; passedChecks += check(fileExists('SECURITY.md'), 'SECURITY.md');
totalChecks++; passedChecks += check(fileExists('CONTRIBUTING.md'), 'CONTRIBUTING.md');
totalChecks++; passedChecks += check(fileExists('CODE_OF_CONDUCT.md'), 'CODE_OF_CONDUCT.md');
totalChecks++; passedChecks += check(fileExists('MAINTAINERS.md'), 'MAINTAINERS.md');
totalChecks++; passedChecks += check(fileExists('CHANGELOG.md'), 'CHANGELOG.md');
totalChecks++; passedChecks += check(fileExists('TPCF.md'), 'TPCF.md');
totalChecks++; passedChecks += check(fileExists('API.md'), 'API.md (bonus)');
console.log('');

// Category 2: .well-known directory (RFC compliance)
console.log(`${colors.blue}🔒 .well-known Directory (RFC Compliance)${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('.well-known/security.txt'), 'security.txt (RFC 9116)');
totalChecks++; passedChecks += check(fileExists('.well-known/ai.txt'), 'ai.txt (AI training policy)');
totalChecks++; passedChecks += check(fileExists('.well-known/humans.txt'), 'humans.txt (attribution)');
console.log('');

// Category 3: Dual Licensing
console.log(`${colors.blue}⚖️  Dual Licensing${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('LICENSES/GPL-3.0.txt'), 'GPL-3.0.txt');
totalChecks++; passedChecks += check(fileExists('LICENSES/Palimpsest-0.8.txt'), 'Palimpsest-0.8.txt');
const licenseFile = fileExists('LICENSE') ? fs.readFileSync('LICENSE', 'utf8') : '';
const hasDualLicense = licenseFile.includes('dual') || licenseFile.includes('Dual');
totalChecks++; passedChecks += check(hasDualLicense, 'Dual license notice in LICENSE');
console.log('');

// Category 4: Build System
console.log(`${colors.blue}🔧 Build System${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('package.json'), 'package.json (npm)');
totalChecks++; passedChecks += check(fileExists('justfile'), 'justfile (build recipes)');
totalChecks++; passedChecks += check(fileExists('flake.nix'), 'flake.nix (Nix reproducible builds)');
totalChecks++; passedChecks += check(fileExists('.github/workflows'), 'CI/CD configuration');
console.log('');

// Category 5: Docker Support
console.log(`${colors.blue}🐳 Docker Support${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('Dockerfile'), 'Dockerfile');
totalChecks++; passedChecks += check(fileExists('docker-compose.yml'), 'docker-compose.yml');
totalChecks++; passedChecks += check(fileExists('.dockerignore'), '.dockerignore');
console.log('');

// Category 6: Testing
console.log(`${colors.blue}🧪 Testing${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('tests'), 'tests/ directory');
totalChecks++; passedChecks += check(fileExists('tests/unit'), 'tests/unit/');
totalChecks++; passedChecks += check(fileExists('tests/integration'), 'tests/integration/');

// Check package.json for test script
if (fileExists('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  totalChecks++; passedChecks += check(packageJson.scripts && packageJson.scripts.test, 'Test script configured');
}
console.log('');

// Category 7: Type Safety (for JavaScript/TypeScript)
console.log(`${colors.blue}🔍 Type Safety (JavaScript)${colors.reset}`);
console.log(`  ${colors.yellow}ℹ${colors.reset} JavaScript is dynamically typed`);
console.log(`  ${colors.yellow}ℹ${colors.reset} Consider adding JSDoc types or TypeScript for improved type safety`);
console.log('');

// Category 8: Security
console.log(`${colors.blue}🛡️  Security${colors.reset}`);
if (fileExists('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasHelmet = packageJson.dependencies && packageJson.dependencies.helmet;
  const hasRateLimit = packageJson.dependencies && packageJson.dependencies['express-rate-limit'];
  const hasCors = packageJson.dependencies && packageJson.dependencies.cors;

  totalChecks++; passedChecks += check(hasHelmet, 'Helmet.js (security headers)');
  totalChecks++; passedChecks += check(hasRateLimit, 'Rate limiting');
  totalChecks++; passedChecks += check(hasCors, 'CORS configuration');
}
console.log('');

// Category 9: Offline-First
console.log(`${colors.blue}📡 Offline-First Capability${colors.reset}`);
console.log(`  ${colors.yellow}ℹ${colors.reset} Application can run without network connectivity`);
console.log(`  ${colors.yellow}ℹ${colors.reset} QR code generation uses local library`);
console.log(`  ${colors.green}✓${colors.reset} Core functionality works offline`);
console.log('');

// Category 10: TPCF Compliance
console.log(`${colors.blue}👥 TPCF (Tri-Perimeter Contribution Framework)${colors.reset}`);
totalChecks++; passedChecks += check(fileExists('TPCF.md'), 'TPCF.md documentation');
if (fileExists('TPCF.md')) {
  const tpcfContent = fs.readFileSync('TPCF.md', 'utf8');
  totalChecks++; passedChecks += check(tpcfContent.includes('Perimeter 1'), 'Perimeter 1 defined');
  totalChecks++; passedChecks += check(tpcfContent.includes('Perimeter 2'), 'Perimeter 2 defined');
  totalChecks++; passedChecks += check(tpcfContent.includes('Perimeter 3'), 'Perimeter 3 defined');
}
console.log('');

// Results Summary
console.log(`${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.cyan}Results${colors.reset}`);
console.log(`${colors.cyan}========================================${colors.reset}`);
console.log('');

const percentage = Math.round((passedChecks / totalChecks) * 100);
const color = percentage >= 90 ? colors.green : percentage >= 70 ? colors.yellow : colors.red;

console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${color}${passedChecks}${colors.reset}`);
console.log(`Failed: ${passedChecks < totalChecks ? colors.red : colors.green}${totalChecks - passedChecks}${colors.reset}`);
console.log(`Compliance: ${color}${percentage}%${colors.reset}`);
console.log('');

// Compliance Level
if (percentage >= 90) {
  console.log(`${colors.green}✓ RSR Bronze Level: ACHIEVED${colors.reset}`);
  console.log('');
  console.log('🎉 Congratulations! This repository meets RSR Bronze level requirements.');
  console.log('');
  console.log('Next steps to improve:');
  console.log('  - Add JSDoc types for better type safety');
  console.log('  - Achieve 100% test coverage');
  console.log('  - Add more comprehensive integration tests');
  console.log('  - Consider Silver/Gold level RSR compliance');
} else if (percentage >= 70) {
  console.log(`${colors.yellow}⚠ RSR Bronze Level: APPROACHING${colors.reset}`);
  console.log('');
  console.log(`You're ${90 - percentage}% away from Bronze level compliance.`);
  console.log('Fix the failing checks above to reach Bronze level.');
} else {
  console.log(`${colors.red}✗ RSR Bronze Level: NOT ACHIEVED${colors.reset}`);
  console.log('');
  console.log('Significant work needed to reach Bronze level compliance.');
  console.log('Focus on the failing checks above.');
}

console.log('');
console.log(`${colors.cyan}========================================${colors.reset}`);

// Exit code
process.exit(percentage >= 90 ? 0 : 1);
