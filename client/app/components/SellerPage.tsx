"use client"
import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/SellerPage.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const SellerPage = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [image1, setImage1] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [stock, setStock] = useState<string>("");
  const router = useRouter();

  const handleStockChange = (e) => {
    if (Number(e.target.value) < 0) {
      alert('Stock cannot be less than 0');
      setStock("");
    } else {
      setStock(e.target.value);
    }
  };

  const uploadPhoto = (e, file: File | null, imageSetter: (url: string) => void) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "exclusive");

    axios.post(`https://api.cloudinary.com/v1_1/dcyeimdps/upload`, formData)
      .then((response) => {
        console.log(response.data.url);
        imageSetter(response.data.url);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while uploading the photo.");
      });
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/products/create", {
      name: name,
      price: price,
      category: category,
      description: description,
      image: image,
      image1: image1,
      image2: image2,
      image3: image3,
      stock: stock
    })
      .then((response) => {
        console.log("result", response);
        toast.success("Product added successfully!");
        setTimeout(() => {
          router.push('/home');
        }, 2000); 
      })
      .catch((error) => {
        console.log("result", error);
        toast.error("An error occurred while adding the product.");
      });
  }

  return (
    <div>

      <div className="add-product-container">
        <div className="add-product-header">
          <h1>Add Product</h1>
        </div>
        <form className="add-product-form">
          <div className="add-form-group">
            <label>Name:</label>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="add-form-group">
            <label>Price:</label>
            <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="add-form-group">
            <label>Category:</label>
            <select name="category-dropdown" onChange={(e) => setCategory(e.target.value)} required>
              <option id='categ' value="">Select Category</option>
              <option value="Phones">Phones</option>
              <option value="Computers">Computers</option>
              <option value="SmartWatch">SmartWatch</option>
              <option value="Camera">Camera</option>
              <option value="HeadPhones">HeadPhones</option>
              <option value="Gaming">Gaming</option>
            </select>
          </div>
          <div className="add-form-group">
            <label>Description:</label>
            <textarea name="description" onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="add-form-group">
            <label>Image:</label>
            <input type="file" name="image" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
            <button onClick={(e) => uploadPhoto(e, file, setImage)}>Upload</button>
          </div>
          <div className="add-form-group">
            <label>Image1:</label>
            <input type="file" name="image1" onChange={(e) => setFile1(e.target.files ? e.target.files[0] : null)} />
            <button onClick={(e) => uploadPhoto(e, file1, setImage1)}>Upload</button>
          </div>
          <div className="add-form-group">
            <label>Image2:</label>
            <input type="file" name="image2" onChange={(e) => setFile2(e.target.files ? e.target.files[0] : null)} />
            <button onClick={(e) => uploadPhoto(e, file2, setImage2)}>Upload</button>
          </div>
          <div className="add-form-group">
            <label>Image3:</label>
            <input type="file" name="image3" onChange={(e) => setFile3(e.target.files ? e.target.files[0] : null)} />
            <button onClick={(e) => uploadPhoto(e, file3, setImage3)}>Upload</button>
          </div>
          <div className="add-form-group">
            <label>Stock:</label>
            <input type="number" name="stock" onChange={handleStockChange} />
          </div>
          <button type="button" className="adding-button" onClick={addProduct}>Add Product</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SellerPage;
