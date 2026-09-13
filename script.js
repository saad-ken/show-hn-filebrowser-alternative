document.addEventListener('DOMContentLoaded', () => {
    const uploadFile = document.getElementById('uploadFile');
    const uploadStatus = document.getElementById('uploadStatus');
    const fileList = document.getElementById('fileList');

    uploadFile.addEventListener('change', (event) => {
        uploadStatus.textContent = 'Uploading files...';
        const files = event.target.files;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file' + i, files[i]);
        }

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            uploadStatus.textContent = '';
            fileList.innerHTML = '';
            data.forEach(file => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = file.thumbnailUrl; // Assuming the server returns a thumbnail URL
                li.appendChild(img);
                li.textContent = file.name;
                fileList.appendChild(li);
            });
        })
        .catch(error => {
            uploadStatus.textContent = 'Error uploading files';
            console.error('Error uploading files:', error);
        });
    });
});
