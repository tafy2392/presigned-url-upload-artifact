<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pre-signed URL Upload</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; }
        .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { margin-top: 0; }
        input, button { font-size: 1rem; padding: 0.5rem; margin-top: 0.5rem; }
        button { cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 4px; }
        #status { margin-top: 1rem; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Upload a File ☁️</h1>
        <input type="file" id="fileInput" />
        <button id="uploadButton">Upload File</button>
        <div id="status">Please select a file to upload.</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
