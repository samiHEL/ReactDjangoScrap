import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'  

const NavBar = ({ username }) => {
  return (
    <div className="navbar">
      <div className="menu">
        {/* Nom du ga connecte  */}
        {username ? (
          <span>Bienvenue, {username}!</span>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
        <Link to="/scrap">Scrap</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default NavBar;
