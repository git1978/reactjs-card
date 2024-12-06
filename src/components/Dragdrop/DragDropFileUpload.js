import React, { useRef, useState } from 'react';
import './DragDropFileUpload.scss';

const DragDropFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILES = 10; // Maximum allowed files
  const MAX_FILE_SIZE_MB = 10; // Maximum file size in MB
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.jfif']; // Allowed file extensions
  const ALLOWED_MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/jfif']; // Allowed media types

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    handleFiles(uploadedFiles);
  };

  const handleFiles = (uploadedFiles) => {
    // Filter files by extension and media type
    const invalidFiles = uploadedFiles.filter((file) => {
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      const fileType = file.type;
      return (
        !ALLOWED_EXTENSIONS.includes(fileExtension) || !ALLOWED_MEDIA_TYPES.includes(fileType)
      );
    });

    if (invalidFiles.length > 0) {
      setErrorMessage(
        `The following files are not allowed: ${invalidFiles
          .map((file) => file.name)
          .join(', ')}. Please upload files with extensions ${ALLOWED_EXTENSIONS.join(
          ', '
        )} and media types ${ALLOWED_MEDIA_TYPES.join(', ')}.`
      );
      return;
    }

    // Filter files by size
    const oversizedFiles = uploadedFiles.filter(
      (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      setErrorMessage(
        `The following files exceed the ${MAX_FILE_SIZE_MB} MB limit: ${oversizedFiles
          .map((file) => file.name)
          .join(', ')}.`
      );
      return;
    }

    // Check the total number of files
    if (files.length + uploadedFiles.length > MAX_FILES) {
      setErrorMessage(`You can upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    const fileObjects = uploadedFiles.map((file) => ({
      file,
      progress: 0,
      uploaded: false,
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileObjects]);
    fileObjects.forEach((file, index) => handleFileUpload(file, files.length + index));
    setErrorMessage(''); // Clear any previous error
  };

  const handleFileUpload = (file, index) => {
    const uploadInterval = setInterval(() => {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        if (updatedFiles[index].progress < 100) {
          updatedFiles[index].progress += 10; // Simulate upload progress
        } else {
          updatedFiles[index].uploaded = true;
          clearInterval(uploadInterval);
        }
        return updatedFiles;
      });
    }, 300); // Update every 300ms
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setErrorMessage(''); // Clear any previous error
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    handleFiles(uploadedFiles);
  };

  const truncateFileName = (fileName) => {
    if (fileName.length > 32) {
      return fileName.substring(0, 32) + '...'; // Truncate and add ellipsis
    }
    return fileName;
  };

  return (
    <div className="drag-drop-file-upload">
      <div
        className="upload-area"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        <div className="upload-area-content row">
          <div className="icon-col col-3">
            <img src="/images/upload.png" alt="upload image" />
          </div>
          <div className="text-col col-9">
            <div>
              Glissez votre fichier au format .pdf, .jpg ou .png (poids max : 10 Mo)
            </div>
            ou <span className="drag-parcourir">parcourez vos documents</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="file-list">
        {files.map((fileData, index) => (
          <div className="file-item" key={index}>
            {fileData.uploaded && <span className="status-icon">✅</span>}
            <span
              className="file-name"
              title={fileData.file.name} // Tooltip with full file name
            >
              {truncateFileName(fileData.file.name)} {/* Truncated name */}
            </span>
            <div className="progress-container">
              {fileData.progress < 100 && (
                <div className="progress-bar">
                  <div
                    className={`progress ${fileData.uploaded ? 'completed' : ''}`}
                    style={{ width: `${fileData.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <span
              className="delete-icon"
              onClick={() => handleDelete(index)}
              title="Delete"
            >
              🗑️
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropFileUpload;