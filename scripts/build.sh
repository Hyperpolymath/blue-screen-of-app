#!/usr/bin/env bash
# Minimal build script

set -euo pipefail

echo "🔨 Building..."

# Export config (or use default)
if command -v nickel &> /dev/null; then
    nickel export --format json config.ncl > config.json
else
    cat > config.json <<'EOF'
{
  "server": {"port": 8080, "host": "0.0.0.0"},
  "app": {"name": "Blue Screen of App"},
  "features": {"analytics": true}
}
EOF
fi

echo "✅ Build complete"
