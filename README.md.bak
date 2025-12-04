# Blue Screen of App

> Does exactly what it says on the tin... or screen.

A humorous, feature-rich web application that displays authentic-looking Blue Screen of Death (BSOD) errors from various Windows versions. Perfect for pranks, screenshots, presentations, or just nostalgia!

[![License: Dual](https://img.shields.io/badge/License-GPL--3.0--or--Palimpsest--0.8-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![RSR Compliance](https://img.shields.io/badge/RSR-Bronze-orange)](https://github.com/rhodium-framework/rsr)
[![TPCF](https://img.shields.io/badge/TPCF-Perimeter%203-green)](TPCF.md)

## Features

### 🎨 Multiple Authentic Styles
- **Windows 10** - Modern blue screen with sad face
- **Windows 11** - Refined design with subtle patterns
- **Windows 7/8** - Classic monospace terminal style
- **Windows XP** - Retro DOS-like appearance with CRT effects

### 🎭 Humorous Error Messages
Over 25 creative error codes including:
- `COFFEE_NOT_FOUND` - Critical system resource missing
- `PRODUCTION_DEPLOYMENT_ON_FRIDAY` - The ultimate developer nightmare
- `NPM_INSTALL_TIMEOUT` - Heat death of universe expected
- `STACKOVERFLOW_COPY_PASTE_ERROR` - Surprising absolutely no one
- And many more!

### ⚙️ Customization Options
- Custom error codes
- Custom error messages
- Custom technical details
- Adjustable completion percentage
- QR code with configurable URL
- Multiple language support

### 🚀 Developer-Friendly
- **REST API** for programmatic BSOD generation
- **Docker support** with multi-stage builds
- **Comprehensive tests** with Jest and Supertest
- **Analytics & Metrics** with Prometheus support
- **Health checks** for monitoring
- **Security features** (Helmet, rate limiting, CORS)

### 🎁 Easter Eggs
- Konami code support
- Keyboard shortcuts to switch styles
- Fake progress bars that slowly increase
- Screen glitch effects on Windows XP style

## Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/blue-screen-of-app.git
cd blue-screen-of-app

# Start with Docker Compose
docker-compose up

# Visit http://localhost:3000
```

### Using Node.js

```bash
# Clone the repository
git clone https://github.com/yourusername/blue-screen-of-app.git
cd blue-screen-of-app

# Install dependencies
npm install

# Start the server
npm start

# Visit http://localhost:3000
```

### Using npm (Development)

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test

# Lint code
npm run lint
```

## Usage Examples

### Web Interface

#### Default BSOD
```
http://localhost:3000
```

#### Windows XP Style
```
http://localhost:3000/?style=winxp
```

#### Custom Error Code
```
http://localhost:3000/?code=COFFEE_NOT_FOUND
```

#### Fully Customized
```
http://localhost:3000/?style=win11&message=System%20overheated&percentage=99&qr=https://example.com
```

#### Random Style
```
http://localhost:3000/random
```

### API Usage

#### Get Random Error Data

```bash
curl http://localhost:3000/api/error
```

Response:
```json
{
  "success": true,
  "data": {
    "stopCode": "NPM_INSTALL_TIMEOUT",
    "description": "npm install has been running for 3 hours. Heat death of universe expected before completion.",
    "technicalDetail": "Memory dump: 0xDEADBEEF",
    "qrMessage": "Scan for emotional support",
    "percentage": 73
  }
}
```

#### Get Specific Error

```bash
curl http://localhost:3000/api/error/COFFEE_NOT_FOUND
```

#### List All Error Codes

```bash
curl http://localhost:3000/api/codes
```

#### Get Analytics

```bash
curl http://localhost:3000/api/analytics
```

#### Health Check

```bash
curl http://localhost:3000/api/health
```

See [API.md](API.md) for complete API documentation.

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Application Settings
APP_NAME=Blue Screen of App
APP_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Features
ENABLE_ANALYTICS=true
ENABLE_QR_CODES=true
DEFAULT_QR_URL=https://github.com/yourusername/blue-screen-of-app

# Security
CORS_ORIGIN=*
HELMET_ENABLED=true
```

See `.env.example` for all available options.

## Project Structure

```
blue-screen-of-app/
├── src/
│   ├── config/           # Configuration management
│   ├── middleware/       # Express middleware
│   ├── routes/           # Route handlers
│   ├── utils/            # Utility functions
│   ├── views/            # EJS templates for each BSOD style
│   ├── public/           # Static assets
│   └── server.js         # Main application entry point
├── tests/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── logs/                 # Application logs (auto-generated)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── .dockerignore         # Docker ignore rules
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Node.js dependencies and scripts
├── API.md                # API documentation
├── CLAUDE.md             # Project context for AI assistants
├── CONTRIBUTING.md       # Contribution guidelines
└── README.md             # This file
```

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### Docker Development

```bash
# Build Docker image
docker build -t blue-screen-of-app .

# Run container
docker run -p 3000:3000 blue-screen-of-app

# Run with docker-compose
docker-compose up

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Deployment

### Azure Web App

This project is configured for automatic deployment to Azure Web App via GitHub Actions.

The workflow:
1. Builds the application on Windows (Node.js 18.x)
2. Runs tests
3. Deploys to Azure Web App (sweb-app)

See `.github/workflows/main_sweb-app.yml` for details.

### Manual Deployment

```bash
# Build (if applicable)
npm run build

# Set production environment
export NODE_ENV=production

# Start server
npm start
```

### Docker Deployment

```bash
# Build production image
docker build -t blue-screen-of-app:latest .

# Run in production
docker run -d \
  -p 80:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  --name bsod \
  --restart unless-stopped \
  blue-screen-of-app:latest
```

## API Documentation

Complete API documentation is available in [API.md](API.md).

Key endpoints:
- `GET /` - Display BSOD (web interface)
- `GET /api/error` - Get random error data
- `GET /api/error/:code` - Get specific error
- `GET /api/codes` - List all error codes
- `GET /api/analytics` - Get usage statistics
- `GET /api/health` - Health check

## Error Codes

### Developer-Themed Errors
- `COFFEE_NOT_FOUND`
- `STACKOVERFLOW_COPY_PASTE_ERROR`
- `GIT_COMMIT_WITHOUT_MESSAGE`
- `PRODUCTION_DEPLOYMENT_ON_FRIDAY`
- `NPM_INSTALL_TIMEOUT`
- `DEPENDENCY_HELL_DETECTED`
- `MERGE_CONFLICT_ANXIETY`
- `SEMICOLON_MISSING`
- `UNDEFINED_IS_NOT_A_FUNCTION`
- `CIRCULAR_DEPENDENCY_LOOP`

### Classic Windows Errors
- `CRITICAL_PROCESS_DIED`
- `SYSTEM_SERVICE_EXCEPTION`
- `PAGE_FAULT_IN_NONPAGED_AREA`
- `IRQL_NOT_LESS_OR_EQUAL`
- `DPC_WATCHDOG_VIOLATION`

And many more! See [API.md](API.md) for the complete list.

## Security

This application includes several security features:

- **Helmet.js** - Security headers
- **Rate Limiting** - Prevents abuse
- **CORS** - Configurable cross-origin policies
- **Input Validation** - Sanitized user inputs
- **Non-root Docker User** - Container security
- **Health Checks** - Monitoring support

## Performance

- **Compression** - gzip compression enabled
- **Efficient Routing** - Express.js best practices
- **Docker Multi-stage Builds** - Smaller images
- **Static Asset Caching** - Improved load times
- **Winston Logging** - Efficient log management

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## RSR Compliance

This project adheres to the **Rhodium Standard Repository (RSR)** framework at **Bronze Level**.

### What is RSR?

RSR is a comprehensive framework for building production-ready, politically autonomous software with emphasis on:
- Complete documentation
- Security best practices
- Reproducible builds
- Community governance
- Emotional safety

### Compliance Features

✅ **Complete Documentation**
- README.md, CLAUDE.md, API.md
- SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md
- MAINTAINERS.md, CHANGELOG.md, TPCF.md

✅ **.well-known Directory** (RFC Compliance)
- security.txt (RFC 9116)
- ai.txt (AI training policies)
- humans.txt (attribution)

✅ **Dual Licensing**
- GPL-3.0 OR Palimpsest v0.8
- Clear license choice for users
- See [LICENSE](LICENSE) for details

✅ **Build System**
- npm/Node.js package management
- justfile (50+ build recipes)
- flake.nix (Nix reproducible builds)
- Docker + Docker Compose

✅ **TPCF (Tri-Perimeter Contribution Framework)**
- Perimeter 3: Community Sandbox (open contribution)
- Graduated trust model
- Emotional safety emphasis
- See [TPCF.md](TPCF.md)

✅ **Security**
- Helmet.js security headers
- Rate limiting
- CORS configuration
- Input validation
- Regular security audits

✅ **Testing**
- Unit tests + Integration tests
- Code coverage reporting
- CI/CD pipeline

### Verify Compliance

```bash
# Using justfile
just validate

# Using Node.js directly
node scripts/rsr-verify.js

# Using Nix
nix run .#validate
```

### Learn More

- **RSR Framework**: https://github.com/rhodium-framework/rsr
- **TPCF**: See [TPCF.md](TPCF.md)
- **Palimpsest License**: See [LICENSES/Palimpsest-0.8.txt](LICENSES/Palimpsest-0.8.txt)

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is dual-licensed. You may use this software under **EITHER**:

- **GNU General Public License v3.0** (GPL-3.0)
- **Palimpsest License v0.8**

See the [LICENSE](LICENSE) file for complete details and guidance on choosing a license.

## Acknowledgments

- Inspired by actual Windows Blue Screens of Death
- Built with Express.js, EJS, and love
- Error messages crafted with developer humor in mind

## Roadmap

- [ ] Additional language translations
- [ ] macOS kernel panic style
- [ ] Linux kernel panic style
- [ ] Custom color themes
- [ ] Sound effects (optional)
- [ ] Screenshot API endpoint
- [ ] Social sharing buttons
- [ ] BSOD history/gallery
- [ ] WebSocket support for live updates

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/blue-screen-of-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/blue-screen-of-app/discussions)

## Fun Facts

- The Windows XP style includes authentic CRT scanline and flicker effects
- The progress bar actually increases over time (but very slowly)
- There are hidden keyboard shortcuts to switch between styles
- The QR codes actually work and can link anywhere
- Over 25 humorous error messages were carefully crafted

---

Made with ☕ and 😄 by developers, for developers.

**Remember**: It's not a bug, it's a `CRITICAL_PROCESS_DIED` error!
