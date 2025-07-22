# Stage 1: Build Angular App
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # This builds into dist/mini-task-manager/browser

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/mini-task-manager/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
