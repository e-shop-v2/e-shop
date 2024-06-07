"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import '../CSS/Navbar.css';
import Image from 'next/image'
import logoutimg from '../images/log-out.png'

interface DecodedToken {
  role: string;
}

const Navbar = () => {
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setRole(decodedToken.role); 
    }
  }, []);

  const handleRedirect = (path: string) => {

    router.push(path);
 };

  const logout = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('token');
    router.push('/login');
    setRole('');
    

 };

  return (
    <div id='navb'>
      <header className="header">
      <div className="topBanner" style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '10px 0', fontSize: '14px' }}>
  Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="/home" style={{ color: 'white', textDecoration: 'underline' }}>Shop Now</a>
</div>

        <nav className="main-nav">
          <div className="logo">Exclusive</div>
          <div className="nav-links">
            <a href="/home">Home</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
            <a href="/singUp">Sign Up</a>
            <input type="text" placeholder="What are you looking for?" />
            <div className="icons">
            {role === 'buyer' &&  <span onClick={() => handleRedirect('/favorites')}>❤️</span>}
              { role === 'buyer' &&  <span onClick={() => handleRedirect('/cart')}>🛒</span> }
              { role === 'buyer' && <span onClick={() => handleRedirect('/buyerProfile')}>👤</span> }
              {role === 'seller' && <span onClick={() => handleRedirect('/sellerProfile')}>👤</span>}
              <span onClick={logout}>
                <Image src={logoutimg} alt="Login Icon" className="icon-image" />
              </span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
