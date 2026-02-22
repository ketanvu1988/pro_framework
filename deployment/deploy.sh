#!/bin/bash

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOYMENT_DIR="$PROJECT_ROOT/deployment"

echo "Using Project Root: $PROJECT_ROOT"

# Ensure we are in the deployment directory
cd "$DEPLOYMENT_DIR"

# Check for docker compose or docker-compose
if docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
elif docker-compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' found."
    exit 1
fi

echo "Stopping existing containers using $DOCKER_COMPOSE..."
$DOCKER_COMPOSE down

echo "Building and starting services..."
$DOCKER_COMPOSE up --build -d

echo "Deployment complete!"
echo "Check status with: $DOCKER_COMPOSE ps"
