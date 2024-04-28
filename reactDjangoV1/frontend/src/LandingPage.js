import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ isLoggedIn }) => {
    const navigate = useNavigate();
  
    const handleGetStartedClick = () => {
      // Redirect based on login status
      const path = isLoggedIn ? '/scrap' : '/login';
      navigate(path);
    };
  
    return (
      <div className="landing-page">
        <h1>Scrap4You</h1>
        <p>Your Gateway to Web Data</p>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
    );
  };
  
  export default LandingPage;
