FROM node:18-alpine
WORKDIR /app

# Copy root and workspace metadata for npm workspaces
COPY package.json package-lock.json ./
COPY apps/auth-service/package.json ./apps/auth-service/package.json
COPY libs/shared/package.json ./libs/shared/package.json

RUN npm ci
COPY . .
RUN npm run build --workspace=auth-service
EXPOSE 3000
CMD ["npm", "run", "start:prod", "--workspace=auth-service"]
