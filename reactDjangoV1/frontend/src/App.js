import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Scrap from './Scrap';
import Shop from './Shop';
import './App.css';
import LandingPage from './LandingPage';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .then(response => {
        setUsername('');
        setIsLoggedIn(false);
      })
      .catch(error => {
        alert('Logout failed: ' + error.message);
      });
  };

  return (
    <Router>
      <div className="background">
        <NavBar username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/scrap" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/scrap" replace /> : <Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scrap" element={isLoggedIn ? <Scrap /> : <Navigate to="/login" replace />} />
          <Route path="/shop" element={isLoggedIn ? <Shop /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
