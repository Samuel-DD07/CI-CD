# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:alpine

# Security upgrades
RUN apk update && apk upgrade --no-cache

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a non-root user and change ownership
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
