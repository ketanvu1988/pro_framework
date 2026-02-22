# Build stage
FROM node:20-slim AS build
WORKDIR /app
COPY frontend/admin-console/package*.json ./
RUN npm install
COPY frontend/admin-console/ ./
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/admin-console/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
