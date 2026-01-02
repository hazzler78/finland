#!/bin/bash
# Cloudflare Pages build script
# This script is used by Cloudflare Pages during deployment

set -e

echo "Installing dependencies..."
npm ci

echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
echo "Output directory: ./out"
