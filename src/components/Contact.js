import { useState } from 'react';

import './Contact.css';


import React from 'react';

function CustomToast({ message, type, visible }) {
  return (
    <div className={`custom-toast ${type} ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    formData.append("access_key", "d890d429-0be9-49d8-a9b7-4470c9884cda");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
  
      const result = await res.json();
  
      if (result.success) {
        setToast({ message: "Email sent successfully!", type: "success", visible: true });
        console.log("Success", result);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          message: ''
        });
      } else {
        setToast({ message: "Submission failed", type: "error", visible: true });
        console.error("Submission failed", result);
      }
    } catch (error) {
      setToast({ message: "Error submitting form", type: "error", visible: true });
      console.error("Error submitting form", error);
    }
  
    // Hide the toast after 3 seconds
    setTimeout(() => {
      setToast((prevToast) => ({ ...prevToast, visible: false }));
    }, 3000);
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <CustomToast 
        message={toast.message} 
        type={toast.type} 
        visible={toast.visible} 
      />
      <h2 className="contact-title">Contact Us </h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Book your appointment or ask any questions</p>
          <div className="contact-details">
            <p><i className="fas fa-phone"></i> +91 9259096974</p>
            <p><i className="fas fa-phone"></i> +91 9389450503</p>
            <p><i className="fas fa-envelope"></i> srnegimehandi.013@gmail.com</p>
            <p><i className="fas fa-location-dot"></i> 14 Khodiyar Bhawan Rishikesh</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284123456!2d78.29399746290225!3d30.118856831670584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA3JzA4LjkiTiA3OMKwMTcnMzguNCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Shop Location"
            ></iframe>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact; 