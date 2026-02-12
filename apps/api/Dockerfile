FROM node:24-alpine

WORKDIR /app

# Install pnpm para melhor performance com monorepo
RUN npm install -g pnpm

# Copy root files
COPY package.json package-lock.json turbo.json tsconfig.base.json ./

# Copy apps
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm ci

# Build
RUN npm run build -- --filter=api

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["npm", "start"]
