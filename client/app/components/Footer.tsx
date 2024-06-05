import React from 'react';
import '../CSS/Footer.css';
import googleplay from '../images/googlePlay.png';
import appStore from '../images/appStore.png';  
import Image from 'next/image'; 

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-section">
          <h3>Exclusive</h3>
          <p>Subscribe to get 10% off your first order</p>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <p>111 , Ariana, TN 24, Tunisie.</p>
          <p>exclusive@gmail.com</p>
          <p>+99-999-999</p>
        </div>
        <div className="footer-section">
          <h3>Account</h3>
          <p>
            <a href="/editProfil">My Account</a>
          </p>
          <p>
            <a href="/login">Login / Register</a>
          </p>
          <p>
            <a href="/cart">Cart</a>
          </p>
          <p>
            <a href="#">Wishlist</a>
          </p>
          <p>
            <a href="/home">Shop</a>
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Link</h3>
          <p>
            <a href="#">Privacy Policy</a>
          </p>
          <p>
            <a href="#">Terms Of Use</a>
          </p>
          <p>
            <a href="#">FAQ</a>
          </p>
          <p>
            <a href="/contact">Contact</a>
          </p>
        </div>
        <div className="footer-section">
          <h3>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className="app-links">
            <a href="#">
              <Image src={googleplay} alt="Google Play" width={150} height={60} />
            </a>
            <a href="#">
              <Image src={appStore} alt="App Store" width={120} height={40} /> 
            </a>
          </div>
        </div>
        <div className="copyright">
          <div className="social-media">
            <a href="#">Facebook  </a> 
            <a href="#">Twitter  </a>
            <a href="#">Instagram  </a>
            <a href="#">LinkedIn  </a> <br/><br/>
          </div>
          &copy; Copyright 2024. All right reserved
        </div>
      </footer>
    </div>
  );
}

export default Footer;
