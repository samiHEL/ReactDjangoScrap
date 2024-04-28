import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin(username);
    navigate('/scrap'); // Redirect to scrapping page after login
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <p className="signup-message">
          New to our platform? <Link to="/signup">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
