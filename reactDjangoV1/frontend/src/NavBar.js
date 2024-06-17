import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';  // Ensure this file is present

const NavBar = ({ username, onLogout }) => {
  return (
    <div className="navbar">
      <div className="menu">
        {username ? (
          <>
            <span className="nav-link">Bienvenue, {username}!</span>
            <Link to="/scrap" className="nav-link">Scrap</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
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
