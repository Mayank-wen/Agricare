import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import axios from "axios";
import { Upload, Image as ImageIcon, Loader } from "lucide-react";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      image
      category
      quantity
    }
  }
`;

const Sell = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Vegetables",
    quantity: "",
    image: null,
  });

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if image is uploaded
      if (!newProduct.image) {
        throw new Error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("file", newProduct.image);

      // Upload image first
      const uploadResponse = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Create product with image URL
      await createProduct({
        variables: {
          input: {
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            category: newProduct.category,
            quantity: parseInt(newProduct.quantity),
            image: uploadResponse.data.url,
          },
        },
      });

      navigate("/shop");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Sell Your Product</h1>
      <Form onSubmit={handleSubmit}>
        <ImageUpload>
          <input
            type="file"
            id="imageUpload"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <UploadArea
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {preview ? (
              <PreviewImage src={preview} alt="Preview" />
            ) : (
              <>
                <Upload size={40} />
                <p>Click to upload product image</p>
              </>
            )}
          </UploadArea>
        </ImageUpload>

        <Input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />

        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />

        <Input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
          required
        />

        <Select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Crops">Crops</option>
          <option value="Tools">Farm Tools</option>
          <option value="Pesticides">Pesticides</option>
        </Select>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;

  h1 {
    text-align: center;
    color: #2e7d32;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageUpload = styled.div`
  margin-bottom: 1rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2e7d32;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1b5e20;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default Sell;
