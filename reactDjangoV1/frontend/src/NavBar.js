import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const NavBar = ({ username, isLoggedIn, tickets, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="menu">
        {isLoggedIn ? (
          <>
            <span>
              Bienvenue, {username}! Vous avez {tickets} tickets.
            </span>
            <Link to="/scrap">Scrap</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/history">Historique des Scraps</Link>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/scrap">Scrap</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/history">Historique des Scraps</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
