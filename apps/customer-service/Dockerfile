FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/customer-service/package.json ./apps/customer-service/package.json
COPY libs/shared/package.json ./libs/shared/package.json

RUN npm ci
COPY . .
RUN npm run build --workspace=customer-service
EXPOSE 3001 4003
CMD ["npm", "run", "start:prod", "--workspace=customer-service"]
