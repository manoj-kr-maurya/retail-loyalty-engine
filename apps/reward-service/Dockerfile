FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/reward-service/package.json ./apps/reward-service/package.json
COPY libs/shared/package.json ./libs/shared/package.json

RUN npm ci
COPY . .
RUN npm run build --workspace=reward-service
EXPOSE 3004 4004
CMD ["npm", "run", "start:prod", "--workspace=reward-service"]
