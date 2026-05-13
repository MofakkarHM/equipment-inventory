# Stage 1: builder 
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: production 
FROM node:20-alpine AS production
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
RUN addgroup -S appgroup \
  && adduser -S appuser -G appgroup
USER appuser
ENV NODE_ENV=production
EXPOSE 3001
CMD ["dumb-init", "node", "dist/index.js"]