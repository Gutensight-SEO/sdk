# Build Stage
FROM node:18 as builder

WORKDIR /usr/src/ui

# Copy UI package files and install dependencies
COPY ui/package*.json ./
RUN npm install

# Copy remaining UI source code from the ui folder and build the project
COPY ./ui/ ./
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the built frontend (from Vite) to Nginx HTML folder
COPY --from=builder /usr/src/ui/dist /usr/share/nginx/html

# Copy custom Nginx configuration file to the repository's nginx folder
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
