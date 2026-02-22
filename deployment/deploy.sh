#!/bin/bash

# Configuration - Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEPLOYMENT_DIR="$PROJECT_ROOT/deployment"

echo "Using Project Root: $PROJECT_ROOT"

# Ensure we are in the deployment directory
cd "$DEPLOYMENT_DIR" || { echo "Could not cd to $DEPLOYMENT_DIR"; exit 1; }

# Check for docker compose or docker-compose
if docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
elif docker-compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' were found on your VM."
    echo "Please run: apt update && apt install docker-compose-plugin"
    exit 1
fi

echo "Using command: $DOCKER_COMPOSE"

echo "Stopping existing containers..."
$DOCKER_COMPOSE down --remove-orphans

echo "Building and starting services..."
$DOCKER_COMPOSE up --build -d

echo "Deployment complete!"
echo "Check status with: $DOCKER_COMPOSE ps"
