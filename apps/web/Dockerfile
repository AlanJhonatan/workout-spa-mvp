FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root files
COPY package.json package-lock.json turbo.json tsconfig.base.json ./

# Copy apps
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm ci

# Build web
RUN npm run build -- --filter=web

WORKDIR /app/apps/web

EXPOSE 5173

CMD ["npm", "run", "preview"]
