import React from 'react';
import '../CSS/Contact.css';

const Contact = () => {
  return (
    <div className="contact-us-container">
      <nav className="breadcrumb">
        <span>Home</span> / <span> <strong>Contact</strong></span>
      </nav>
      <div className="contact-us-content">
        <div className="contact-details">
          <div className="contact-method">
            <div className="icon">
              <img src="https://www.seekpng.com/png/full/949-9498502_business-phone-system-transparent-phone-icon.png" alt="Phone Icon" />
            </div>
            <div className="details">
              <h3>Call To Us</h3>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>
          <hr />
          <div className="contact-method">
            <div className="icon">
              <img src="https://i.pinimg.com/736x/6e/5b/e8/6e5be8ee9d7d0d532988d35c6d5bd455.jpg" alt="Email Icon" />
            </div>
            <div className="details">
              <h3>Write To Us</h3>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Your Name *" />
            <input type="email" placeholder="Your Email *" />
            <input type="text" placeholder="Your Phone *" />
          </div>
          <textarea placeholder="Your Message"></textarea>
          <button className="sendbutton">Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
