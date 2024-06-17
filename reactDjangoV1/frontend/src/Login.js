import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Ensure this file is present

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulating login success
    onLogin(username);
    navigate('/scrap'); // Redirect to scrapping page after login
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>SCRAP MY DATA</h1>
        <p>We do bla bla bla bla ...</p>
        <button className="learn-more-button">LEARN ABOUT US</button>
      </div>
      <div className="login-right">
        <h2>GET YOUR DATA INSTANT ONLINE</h2>
        <div className="login-form">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Registration Number"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
