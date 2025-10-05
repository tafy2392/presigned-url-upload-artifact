// --- Get references to the HTML elements ---
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const statusDiv = document.getElementById('status');

// --- Add event listener to the upload button ---
uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];

    // 1. Basic validation: Make sure a file was selected
    if (!file) {
        statusDiv.textContent = '❌ Error: Please select a file first.';
        statusDiv.style.color = 'red';
        return;
    }
    
    statusDiv.textContent = '⏳ Initializing upload...';
    statusDiv.style.color = 'black';

    try {
        // --- STEP 1: Get the pre-signed URL from your backend ---
        // We send the filename and file type to the backend.
        // The backend will use this to generate the correct URL.
        const response = await fetch('https://xxx.com/get-presigned-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        
        // The backend should return the pre-signed URL in its response
        const { uploadUrl } = await response.json();
        console.log('Received pre-signed URL:', uploadUrl);
        statusDiv.textContent = '⏳ Uploading file directly to storage...';

        // --- STEP 2: Upload the actual file to the pre-signed URL ---
        // This request goes directly to the cloud storage (e.g., S3), NOT your backend.
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                // The Content-Type header MUST match the one used to generate the URL
                'Content-Type': file.type,
            },
            body: file, // The file object itself is the body
        });

        if (uploadResponse.ok) {
            statusDiv.textContent = '✅ Success! File uploaded.';
            statusDiv.style.color = 'green';
        } else {
            throw new Error(`Upload failed: ${uploadResponse.statusText}`);
        }

    } catch (error) {
        console.error('An error occurred:', error);
        statusDiv.textContent = `❌ Error: ${error.message}`;
        statusDiv.style.color = 'red';
    }
});
