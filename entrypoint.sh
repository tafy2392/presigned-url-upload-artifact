#!/bin/sh
# This script is executed when the Docker container starts.

# Define the path to the HTML file that needs configuration
HTML_FILE="/usr/share/nginx/html/index.html"

# Echo the variables to the console for debugging purposes.
# The ":-"" syntax provides a default empty value if the variable isn't set.
echo "Attempting to configure frontend with Backend URL: ${BACKEND_API_URL:-"Not Set"}"
echo "Attempting to configure frontend with API Key: ${API_KEY:-"Not Set"}"

# Use the 'sed' command to find and replace the placeholders in index.html.
# The '|' character is used as a delimiter to avoid issues with URLs containing slashes.
sed -i "s|__BACKEND_API_URL__|${BACKEND_API_URL:-""}|g" $HTML_FILE
sed -i "s|__API_KEY__|${API_KEY:-""}|g" $HTML_FILE

echo "Configuration complete. Starting NGINX..."

# Hand over control to the main NGINX process.
# This starts the web server to serve the now-configured files.
exec nginx -g 'daemon off;'
