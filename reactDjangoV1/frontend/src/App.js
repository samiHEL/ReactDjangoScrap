import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Scrap from './Scrap';
import './App.css';
import LandingPage from './LandingPage'
function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };


  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;