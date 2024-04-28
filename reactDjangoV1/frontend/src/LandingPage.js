import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/scrap');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      <h1 id="company-name">Scrap4You</h1>
      <p>Data at your fingertips</p>
      <button onClick={handleGetStartedClick}>Get Started</button>
    </div>
  );
};

export default LandingPage;
