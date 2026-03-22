FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/notification-service/package.json ./apps/notification-service/package.json
COPY libs/shared/package.json ./libs/shared/package.json

RUN npm ci
COPY . .
RUN npm run build --workspace=notification-service
EXPOSE 4002
CMD ["npm", "run", "start:prod", "--workspace=notification-service"]
