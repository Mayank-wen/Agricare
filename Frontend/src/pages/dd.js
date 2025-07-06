import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Upload, AlertCircle } from "lucide-react";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto; // Remove top margin since Layout handles it
  padding: 0 1rem;

  h1 {
    color: #2e7d32;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8faf8;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    border-color: #2ecc71;
  }
`;

const Results = styled.div`
  margin-top: 2rem;
`;

const ResultCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ConfidenceBar = styled.div`
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin-top: 0.5rem;

  div {
    height: 100%;
    background: #2ecc71;
    border-radius: 4px;
    width: ${(props) => props.value}%;
  }
`;

// Add loading animation
const LoadingText = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "...";
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      content: ".";
    }
    40% {
      content: "..";
    }
    60% {
      content: "...";
    }
    80% {
      content: "....";
    }
    100% {
      content: ".....";
    }
  }
`;

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/detect-disease",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setPredictions(response.data.predictions);
      } else {
        throw new Error(response.data.error || "Analysis failed");
      }
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Crop Disease Detection</h1>

      <UploadArea onClick={() => document.getElementById("fileInput").click()}>
        <input
          type="file"
          id="fileInput"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        {image ? (
          <img
            src={image}
            alt="Uploaded crop"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        ) : (
          <div>
            <Upload size={48} />
            <p>Click or drag image to upload</p>
          </div>
        )}
      </UploadArea>

      {loading && <LoadingText>Analyzing image</LoadingText>}

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <AlertCircle /> {error}
        </div>
      )}

      {predictions && (
        <Results>
          <h2>Results</h2>
          {predictions.map((pred, index) => (
            <ResultCard key={index}>
              <h3>{pred.disease}</h3>
              <ConfidenceBar value={pred.confidence * 100}>
                <div />
              </ConfidenceBar>
              <p>{(pred.confidence * 100).toFixed(1)}% confidence</p>
            </ResultCard>
          ))}
        </Results>
      )}
    </Container>
  );
};

export default DiseaseDetection;
