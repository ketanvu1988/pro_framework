#!/bin/bash

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOYMENT_DIR="$PROJECT_ROOT/deployment"

echo "Using Project Root: $PROJECT_ROOT"

# Ensure we are in the deployment directory
cd "$DEPLOYMENT_DIR"

echo "Stopping existing containers..."
docker compose down

echo "Building and starting services..."
# We use --build to ensure any changes in the source code are picked up
docker compose up --build -d

echo "Deployment complete!"
echo "Check status with: docker compose ps"
