import React, { useState } from 'react';
import { storage } from '../firebase-config';

const UploadButton = ({ folderName }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsUploading(true);
      setProgress(0);

      const storageRef = storage.ref(`${folderName}/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.error(error);
          setIsUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setIsUploading(false);
            setProgress(100);
            setDownloadURL(url);
          });
        }
      );
    }
  };

  return (
    <div>
      <label htmlFor="uploadInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload Image
      </label>
      <input
        type="file"
        id="uploadInput"
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
      />
      {isUploading && <p>Uploading: {progress}%</p>}
      {downloadURL && <img src={downloadURL} alt="Uploaded" className="max-w-full h-auto" />}
    </div>
  );
};

export default UploadButton;
