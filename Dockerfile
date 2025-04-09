# Step 1: Build the React app
FROM node:18-alpine as builder

WORKDIR /app

COPY client/package*.json ./
RUN npm install --legacy-peer-deps


COPY client/ .
RUN npm run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
