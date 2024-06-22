import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ username, isLoggedIn, tickets, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="menu">
        {isLoggedIn ? (
          <>
            <span className="nav-link">Bienvenue, {username}! Vous avez {tickets} tickets.</span>
            <Link to="/scrap" className="nav-link">Scrap</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/history" className="nav-link">Historique des Scraps</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Connexion</Link>
            <Link to="/scrap" className="nav-link">Scrap</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
