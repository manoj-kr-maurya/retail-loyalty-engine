FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/loyalty-service/package.json ./apps/loyalty-service/package.json
COPY libs/shared/package.json ./libs/shared/package.json

RUN npm ci
COPY . .
RUN npm run build --workspace=loyalty-service
EXPOSE 4001
CMD ["npm", "run", "start:prod", "--workspace=loyalty-service"]
