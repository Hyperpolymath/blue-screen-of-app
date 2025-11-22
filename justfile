# justfile for Blue Screen of App
# https://github.com/casey/just

# Default recipe - show available commands
default:
    @just --list

# Install dependencies
install:
    npm install

# Install dependencies (clean install)
install-clean:
    rm -rf node_modules package-lock.json
    npm install

# Start the application
start:
    npm start

# Start in development mode with auto-reload
dev:
    npm run dev

# Run all tests
test:
    npm test

# Run tests in watch mode
test-watch:
    npm run test:watch

# Run tests with coverage
test-coverage:
    npm test -- --coverage

# Run tests with verbose output
test-verbose:
    npm test -- --verbose

# Lint code
lint:
    npm run lint

# Lint and auto-fix
lint-fix:
    npm run lint:fix

# Format code (if prettier is added)
format:
    @echo "Prettier not yet configured. Run: npm install --save-dev prettier"
    @echo "Then add format script to package.json"

# Build the application (if build step exists)
build:
    @echo "No build step required for this Node.js application"
    @echo "Application runs directly from source"

# Clean generated files
clean:
    rm -rf node_modules coverage logs/*.log

# Clean everything including lock files
clean-all: clean
    rm -f package-lock.json

# Validate RSR compliance
validate:
    @echo "Checking RSR (Rhodium Standard Repository) compliance..."
    @echo ""
    @echo "✅ Documentation:"
    @test -f README.md && echo "  ✓ README.md" || echo "  ✗ README.md MISSING"
    @test -f CLAUDE.md && echo "  ✓ CLAUDE.md" || echo "  ✗ CLAUDE.md MISSING"
    @test -f LICENSE && echo "  ✓ LICENSE" || echo "  ✗ LICENSE MISSING"
    @test -f SECURITY.md && echo "  ✓ SECURITY.md" || echo "  ✗ SECURITY.md MISSING"
    @test -f CONTRIBUTING.md && echo "  ✓ CONTRIBUTING.md" || echo "  ✗ CONTRIBUTING.md MISSING"
    @test -f CODE_OF_CONDUCT.md && echo "  ✓ CODE_OF_CONDUCT.md" || echo "  ✗ CODE_OF_CONDUCT.md MISSING"
    @test -f MAINTAINERS.md && echo "  ✓ MAINTAINERS.md" || echo "  ✗ MAINTAINERS.md MISSING"
    @test -f CHANGELOG.md && echo "  ✓ CHANGELOG.md" || echo "  ✗ CHANGELOG.md MISSING"
    @test -f TPCF.md && echo "  ✓ TPCF.md" || echo "  ✗ TPCF.md MISSING"
    @echo ""
    @echo "✅ .well-known directory:"
    @test -f .well-known/security.txt && echo "  ✓ security.txt (RFC 9116)" || echo "  ✗ security.txt MISSING"
    @test -f .well-known/ai.txt && echo "  ✓ ai.txt" || echo "  ✗ ai.txt MISSING"
    @test -f .well-known/humans.txt && echo "  ✓ humans.txt" || echo "  ✗ humans.txt MISSING"
    @echo ""
    @echo "✅ Build system:"
    @test -f package.json && echo "  ✓ package.json" || echo "  ✗ package.json MISSING"
    @test -f justfile && echo "  ✓ justfile" || echo "  ✗ justfile MISSING"
    @test -f flake.nix && echo "  ✓ flake.nix" || echo "  ✗ flake.nix MISSING"
    @test -f Dockerfile && echo "  ✓ Dockerfile" || echo "  ✗ Dockerfile MISSING"
    @test -f docker-compose.yml && echo "  ✓ docker-compose.yml" || echo "  ✗ docker-compose.yml MISSING"
    @echo ""
    @echo "✅ Dual Licensing:"
    @test -f LICENSES/GPL-3.0.txt && echo "  ✓ GPL-3.0" || echo "  ✗ GPL-3.0 MISSING"
    @test -f LICENSES/Palimpsest-0.8.txt && echo "  ✓ Palimpsest v0.8" || echo "  ✗ Palimpsest v0.8 MISSING"
    @echo ""
    @echo "RSR Compliance Check Complete!"

# Run security audit
security-audit:
    npm audit

# Fix security vulnerabilities
security-fix:
    npm audit fix

# Check for outdated dependencies
outdated:
    npm outdated

# Update dependencies
update:
    npm update

# Docker build
docker-build:
    docker build -t blue-screen-of-app:latest .

# Docker run
docker-run:
    docker run -p 3000:3000 --env-file .env blue-screen-of-app:latest

# Docker compose up
docker-up:
    docker-compose up

# Docker compose up (detached)
docker-up-detached:
    docker-compose up -d

# Docker compose down
docker-down:
    docker-compose down

# Docker compose logs
docker-logs:
    docker-compose logs -f

# View application logs
logs:
    tail -f logs/combined.log

# View error logs only
logs-error:
    tail -f logs/error.log

# Check application health
health:
    curl -f http://localhost:3000/api/health || echo "Application not running"

# Get analytics
analytics:
    curl -s http://localhost:3000/api/analytics | jq '.'

# Get metrics (Prometheus format)
metrics:
    curl -s http://localhost:3000/api/metrics

# List all error codes
error-codes:
    curl -s http://localhost:3000/api/codes | jq '.data.codes[]'

# List all styles
styles:
    curl -s http://localhost:3000/api/styles | jq '.data.styles[]'

# Get random error
random-error:
    curl -s http://localhost:3000/api/error | jq '.'

# Check code quality
quality: lint test-coverage

# Pre-commit checks
pre-commit: lint test

# CI simulation (what CI runs)
ci: install test lint validate

# Release preparation checklist
release-check:
    @echo "Release Checklist:"
    @echo "  [ ] Update CHANGELOG.md"
    @echo "  [ ] Update version in package.json"
    @echo "  [ ] Run: just ci"
    @echo "  [ ] Create git tag"
    @echo "  [ ] Push to main branch"
    @echo "  [ ] Create GitHub release"
    @echo "  [ ] Monitor deployment"

# Generate coverage report
coverage-report:
    npm test -- --coverage --coverageReporters=html
    @echo "Coverage report generated in coverage/index.html"

# Count lines of code
loc:
    @echo "Lines of Code:"
    @find src -name "*.js" | xargs wc -l | tail -1
    @echo ""
    @echo "Lines of Tests:"
    @find tests -name "*.js" | xargs wc -l | tail -1
    @echo ""
    @echo "Lines of Documentation:"
    @wc -l *.md | tail -1

# Show project statistics
stats:
    @echo "Project Statistics:"
    @echo "==================="
    @echo ""
    @echo "Source Files:"
    @find src -type f -name "*.js" | wc -l
    @echo ""
    @echo "Test Files:"
    @find tests -type f -name "*.js" | wc -l
    @echo ""
    @echo "Documentation Files:"
    @find . -maxdepth 1 -name "*.md" | wc -l
    @echo ""
    @echo "Dependencies:"
    @cat package.json | jq '.dependencies | length'
    @echo ""
    @echo "Dev Dependencies:"
    @cat package.json | jq '.devDependencies | length'

# Setup development environment
setup: install
    @echo "Creating .env file from .env.example..."
    @test -f .env || cp .env.example .env
    @echo "Creating logs directory..."
    @mkdir -p logs
    @echo ""
    @echo "Setup complete! Run 'just dev' to start development server."

# Teardown development environment
teardown: clean
    @echo "Removing .env file..."
    @rm -f .env
    @echo "Teardown complete!"

# Show environment information
env-info:
    @echo "Environment Information:"
    @echo "========================"
    @echo "Node version: $(node --version)"
    @echo "npm version: $(npm --version)"
    @echo "Platform: $(uname -s)"
    @echo "Architecture: $(uname -m)"
    @which docker && echo "Docker: $(docker --version)" || echo "Docker: not installed"
    @which just && echo "just: $(just --version)" || echo "just: not installed"

# Help - show detailed command information
help:
    @echo "Blue Screen of App - Development Commands"
    @echo "=========================================="
    @echo ""
    @echo "Setup & Installation:"
    @echo "  install         - Install dependencies"
    @echo "  install-clean   - Clean install (removes node_modules first)"
    @echo "  setup           - Full development environment setup"
    @echo ""
    @echo "Development:"
    @echo "  dev             - Start development server with auto-reload"
    @echo "  start           - Start production server"
    @echo "  logs            - Tail application logs"
    @echo "  logs-error      - Tail error logs only"
    @echo ""
    @echo "Testing:"
    @echo "  test            - Run all tests"
    @echo "  test-watch      - Run tests in watch mode"
    @echo "  test-coverage   - Run tests with coverage"
    @echo "  coverage-report - Generate HTML coverage report"
    @echo ""
    @echo "Code Quality:"
    @echo "  lint            - Check code style"
    @echo "  lint-fix        - Fix code style issues"
    @echo "  quality         - Run linting and coverage"
    @echo "  pre-commit      - Run pre-commit checks"
    @echo ""
    @echo "Docker:"
    @echo "  docker-build    - Build Docker image"
    @echo "  docker-run      - Run Docker container"
    @echo "  docker-up       - Start with docker-compose"
    @echo "  docker-down     - Stop docker-compose"
    @echo "  docker-logs     - View docker-compose logs"
    @echo ""
    @echo "API & Monitoring:"
    @echo "  health          - Check application health"
    @echo "  analytics       - View analytics data"
    @echo "  metrics         - View Prometheus metrics"
    @echo "  error-codes     - List all error codes"
    @echo "  styles          - List all BSOD styles"
    @echo "  random-error    - Get random error data"
    @echo ""
    @echo "Maintenance:"
    @echo "  clean           - Remove generated files"
    @echo "  clean-all       - Remove all generated files including lock files"
    @echo "  security-audit  - Run npm security audit"
    @echo "  security-fix    - Fix security vulnerabilities"
    @echo "  outdated        - Check for outdated dependencies"
    @echo "  update          - Update dependencies"
    @echo ""
    @echo "RSR Compliance:"
    @echo "  validate        - Check RSR compliance"
    @echo "  stats           - Show project statistics"
    @echo "  loc             - Count lines of code"
    @echo ""
    @echo "CI/CD:"
    @echo "  ci              - Simulate CI pipeline"
    @echo "  release-check   - Show release checklist"
    @echo ""
    @echo "Utilities:"
    @echo "  env-info        - Show environment information"
    @echo "  help            - Show this help message"
    @echo ""
    @echo "For more information, see: README.md, CONTRIBUTING.md, CLAUDE.md"
