import React, { useRef, useState } from "react";
import styled from "styled-components";

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;

  input[type="file"] {
    display: none;
  }
`;

const UploadButton = styled.label`
  padding: 10px 15px;
  background: #60a5fa;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #3b82f6;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageUploadContainer>
      <UploadButton onClick={() => fileInputRef.current.click()}>
        Upload Product Image
      </UploadButton>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
      <ImagePreview>
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <span>No image selected</span>
        )}
      </ImagePreview>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
