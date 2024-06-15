import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState('');
  const [passwordFormatError, setPasswordFormatError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 6;
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    return lengthValid && containsUppercase && containsLowercase;
  };

  const handleSignup = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordLengthError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordLengthError('');
    }

    if (!validatePassword(password)) {
      setPasswordFormatError('Password must contain at least one uppercase letter and one lowercase letter');
      valid = false;
    } else {
      setPasswordFormatError('');
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    axiosInstance.post('/api/signup', { username, password, email })
      .then(response => {
        alert('Signup successful');
        navigate('/login'); // Navigate to login page after signup
      })
      .catch(error => {
        alert('Signup failed: ' + error.response.data);
      });
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
        {passwordLengthError && <p style={{ color: 'red' }}>{passwordLengthError}</p>}
        {passwordFormatError && <p style={{ color: 'red' }}>{passwordFormatError}</p>}
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (!validateEmail(e.target.value)) {
              setEmailError('Invalid email address');
            } else {
              setEmailError('');
            }
          }}
          placeholder="Email"
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
