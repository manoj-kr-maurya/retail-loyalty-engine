# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy workspace package files
COPY apps/*/package*.json ./apps/
COPY libs/*/package*.json ./libs/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client if needed
RUN npm run prisma:generate

# Build all workspaces
RUN npm run build:all

# Expose ports for all services
EXPOSE 3000 3001 3004 4001 4002 4003 4004

# Start all services
CMD ["npm", "run", "start:all"]