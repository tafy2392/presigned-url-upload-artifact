# Use a lightweight and secure NGINX image as a base
FROM nginx:stable-alpine

# Set the working directory to the default NGINX public HTML folder
WORKDIR /usr/share/nginx/html

# Remove the default NGINX welcome page to avoid conflicts
RUN rm -f index.html

# Copy your application files (index.html, script.js, etc.) into the working directory.
# Ensure this Dockerfile is in the same directory as your frontend files.
COPY . .

# Copy the startup script from your project into the container's root directory
COPY entrypoint.sh /entrypoint.sh

# Make the startup script executable so it can be run
RUN chmod +x /entrypoint.sh

# Set the entrypoint for the container.
# This tells Docker to run our script instead of the default NGINX command when the container starts.
ENTRYPOINT ["/entrypoint.sh"]
