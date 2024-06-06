"use client"
import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/About.css"

const About = () => {
    const [file, setPhoto] = useState<File | null>(null);
    const [file2, setPhoto2] = useState<File | null>(null);
    const [file3, setPhoto3] = useState<File | null>(null);
  
    const [image, setImage] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');


    const uploadPhoto = (file: File | null, setImage: React.Dispatch<React.SetStateAction<string>>) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", "exclusive");

            axios.post(`https://api.cloudinary.com/v1_1/dcyeimdps/upload`, formData)
                .then((response) => {
                    setImage(response.data.secure_url);
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
          
            <div className="our-story-container">
                <div className="breadcrumb">
                    <a href="/">Home</a> / <span>About</span>
                </div>
                <div className="our-story-content">
                    <div className="text-section">
                        <h2>Our Story</h2>
                        <p>
                            Exclusive has more than 1 million products to offer, growing at a very
                            fast pace. Exclusive offers a diverse assortment in categories ranging
                            from consumer.
                        </p>
                    </div>
                    <div className="image-section">
                        <img src="https://i.pinimg.com/originals/f6/2e/c3/f62ec33251d6e4f1555cdfbd53acadbe.gif" alt="Our Story" />
                    </div>
                </div>
                <div className="stats-section">
                    <div className="stat">
                        <p>10.5k</p>
                        <span>Sellers active our site</span>
                    </div>
                    <div className="stat highlight">
                        <p>33k</p>
                        <span>Monthly Product Sale</span>
                    </div>
                    <div className="stat">
                        <p>45.5k</p>
                        <span>Customer active in our site</span>
                    </div>
                    <div className="stat">
                        <p>25k</p>
                        <span>Annual gross sale in our site</span>
                    </div>
                </div>
                <div className="team-section">
                    <div className="team-member">
                        <img src={image} alt="Tom Cruise" style={{ width: '250px', height: '200px', borderRadius: '5px' }} />
                        <p className="name">Adem Saleh</p>
                        <p className="position">Founder & Chairman</p>
                        <div className="social-icons">
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-linkedin"></i>
                            <input type="file" onChange={(e) => {
                                const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
                                setPhoto(selectedFile);
                            }} />
                            <button onClick={() => uploadPhoto(file, setImage)}>upload</button>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={image2} alt="Scrum" style={{ width: '250px', height: '200px', borderRadius: '5px' }} />
                        <p className="name">Aziz chinguiti</p>
                        <p className="position">Managing Director</p>
                        <div className="social-icons">
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-linkedin"></i>
                            <input type="file" onChange={(e) => {
                                const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
                                setPhoto2(selectedFile);
                            }} />
                            <button onClick={() => uploadPhoto(file2, setImage2)}>upload</button>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={image3} alt="Raslen Bouallueg" style={{ width: '250px', height: '200px', borderRadius: '5px' }} />
                        <p className="name">Youssef Hichri</p>
                        <p className="position">Product Designer</p>
                        <div className="social-icons">
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-linkedin"></i>
                            <input type="file" onChange={(e) => {
                                const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
                                setPhoto3(selectedFile);
                            }} />
                            <button onClick={() => uploadPhoto(file3, setImage3)}>upload</button>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
    );
};

export default About;