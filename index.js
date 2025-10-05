// --- Configuration ---
// This script now expects its configuration to be available on the window object.
// This is set by a small script block in index.html before this file is loaded.
const API_URL = window.APP_CONFIG.BACKEND_API_URL;
const API_KEY = window.APP_CONFIG.API_KEY;

// --- Get references to the HTML elements ---
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const statusDiv = document.getElementById('status');

// --- Main Event Listener ---
uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];

    // 1. Basic validation
    if (!file) {
        statusDiv.textContent = '❌ Error: Please select a file first.';
        statusDiv.style.color = 'red';
        return;
    }

    // Check if the configuration was loaded correctly
    if (!API_URL || API_URL.startsWith('__')) {
        statusDiv.textContent = '❌ Configuration Error: Backend URL is not set.';
        statusDiv.style.color = 'red';
        console.error("Backend URL placeholder was not replaced. Check container environment variables.");
        return;
    }
    
    statusDiv.textContent = '⏳ Initializing upload...';
    statusDiv.style.color = 'black';

    try {
        // --- STEP 1: Get the pre-signed URL from your backend ---
        const response = await fetch(`${API_URL}/get-presigned-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY // Add the API key header
            },
            body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server error (${response.status}): ${errorData.error || response.statusText}`);
        }
        
        const { uploadUrl, key } = await response.json();
        statusDiv.textContent = '⏳ Uploading file directly to storage...';

        // --- STEP 2: Upload the actual file to the pre-signed URL ---
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (uploadResponse.ok) {
            statusDiv.textContent = '✅ Success! File uploaded.';
            statusDiv.style.color = 'green';
            // Optional: You could now make a second call to your backend with the 'key'
            // to confirm the upload is complete.
        } else {
            throw new Error(`Upload failed with status: ${uploadResponse.statusText}`);
        }

    } catch (error) {
        console.error('An error occurred:', error);
        statusDiv.textContent = `❌ Error: ${error.message}`;
        statusDiv.style.color = 'red';
    }
});
