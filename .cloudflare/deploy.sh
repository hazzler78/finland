#!/bin/bash
# Cloudflare Pages deployment script

echo "Building for Cloudflare Pages..."
npm run build

echo "Build complete! Output in ./out directory"
echo "Ready for Cloudflare Pages deployment"
