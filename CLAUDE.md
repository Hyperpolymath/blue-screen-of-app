# Blue Screen of App

## Project Overview

This is a humorous web application that displays a blue screen (inspired by the Windows Blue Screen of Death). The project name plays on the phrase "does what it says on the tin" - it literally shows a blue screen.

## Tech Stack

- **Runtime**: Node.js 18.x
- **Deployment**: Azure Web App (sweb-app)
- **CI/CD**: GitHub Actions

## Project Structure

This is a minimal web application project currently in early development stages.

```
.
├── .github/
│   └── workflows/
│       └── main_sweb-app.yml  # Azure deployment workflow
├── .gitignore                  # Build artifacts and dependencies
├── LICENSE                     # MIT License
└── README.md                   # Project description
```

## Development Setup

### Prerequisites

- Node.js 18.x or later
- npm (comes with Node.js)

### Getting Started

1. Clone the repository
2. Install dependencies (once package.json is created):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Deployment

The application is automatically deployed to Azure Web App when changes are pushed to the `main` branch.

### Deployment Pipeline

1. **Build Job** (runs on Windows):
   - Checks out code
   - Sets up Node.js 18.x
   - Runs `npm install`
   - Runs `npm run build` (if present)
   - Runs `npm run test` (if present)
   - Uploads build artifacts

2. **Deploy Job** (runs on Ubuntu):
   - Downloads build artifacts
   - Deploys to Azure Web App 'sweb-app' (Production slot)

### Azure Configuration

- **App Name**: sweb-app
- **Environment**: Production
- **Authentication**: Uses Azure publish profile stored in GitHub Secrets

## Next Steps for Development

To make this a functional web application, you'll need to:

1. **Create package.json**:
   - Define project metadata
   - Add dependencies (e.g., Express.js for web server)
   - Define scripts (start, build, test)

2. **Create main application file**:
   - Set up a web server (Express, Fastify, etc.)
   - Create routes
   - Serve the blue screen page

3. **Create the blue screen UI**:
   - HTML/CSS to replicate the classic BSOD look
   - Make it responsive
   - Add humorous error messages

4. **Add tests**:
   - Unit tests for server logic
   - Integration tests for routes

## Notes

- The .gitignore file currently contains Erlang-specific entries which may need to be updated for a Node.js project
- No source code files exist yet - the project is ready for initial implementation
