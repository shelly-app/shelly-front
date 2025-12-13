#!/bin/bash

# Script to generate TypeScript types from the backend OpenAPI specification
# Usage: pnpm generate:types

BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"
SPEC_URL="$BACKEND_URL/api-docs/swagger.json"
OUTPUT_FILE="src/types/generated/api.ts"

echo "📥 Fetching OpenAPI specification from $SPEC_URL..."

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Fetch the spec and generate types
if curl -f -s "$SPEC_URL" > /dev/null 2>&1; then
  echo "✓ Backend is reachable"
  npx openapi-typescript "$SPEC_URL" -o "$OUTPUT_FILE"
  echo "✓ Types generated successfully at $OUTPUT_FILE"
else
  echo "❌ Error: Backend is not running or not reachable at $SPEC_URL"
  echo "   Please start the backend server first with: cd ../back && pnpm dev"
  exit 1
fi
