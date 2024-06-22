import React from 'react';
import './Contact.css';
import contactImage from './image.png';  // Import the image

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <img src={contactImage} alt="Contact" />
      </div>
      <div className="contact-right">
        <h1>Contactez-Nous</h1>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter via email à info@scrap4you.com.</p>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
