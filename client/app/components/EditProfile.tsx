"use client"

import React , { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/EditProfile.css';
import Image from "next/image"

const EditProfile = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newpassword, setNewpassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [refresh, setRefresh] = useState<boolean>(false);
  const [welcome, setWelcome] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode in Base64 and split 
      console.log("Decoded Token:", decodedToken); 
      setWelcome(`Welcome ${decodedToken.name}!`); 
    }
  }, []);

  const confirmpass = () => {
    if (newpassword !== confirmpassword) {
      setErrorMessage("New password and confirm password do not match."); 
      return;
    }

    axios.put('http://localhost:8080/api/seller/profile/update', {
      firstname: firstname,
      lastname: lastname,
      email: email,
      address: address,
      password: password,
      newPassword: newpassword
    })
      .then(response => {
        console.log(response.data);
        setRefresh(!refresh);
        setWelcome(`Welcome ${response.data.firstname}!`);
        toast.success("Profile updated successfully!");
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occurred while updating the profile.");
      });
  };

  return (
    <div>
     <div className="aziz-breadcrumb">Home / My Account</div>
      <div className='welcome'>{welcome}</div> 
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-section">
            <h4 onClick={() => router.push('/add')}>Add Product</h4>
            <ul>
              <li className="active">My Profile</li>
              <li>Address Book</li>
            </ul>
          </div>
          <div className="sidebar-section"></div>
          <div className="sidebar-section">
            <h4>My Wishlist</h4>
          </div>
        </div>
        <div className="main-content">
          <h2 className='title-edit'>Edit Your Profile</h2>
          <form className="edit-profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="form-group2">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group2">
              <label id='ad'>Address</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
          <form className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage} <Image src="https://www.freeiconspng.com/uploads/error-icon-4.png" alt="" width={17}/></p>} 
            </div>
            <div className="aziz-form-actions">
              <button type="button" className="aziz-cancelButton">Cancel</button>
              <button type="button" className="aziz-saveButton" onClick={confirmpass}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
   
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
