# frontend.Dockerfile

# Use the official NGINX image
FROM nginx:stable-alpine

# Copy your static files to the NGINX public directory
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
