import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./NavBar";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import Scrap from "./Scrap";
import Shop from "./Shop";
import History from "./History";
import "./App.css";
import LandingPage from "./LandingPage";
import axiosInstance from "./axiosConfig";
import Success from "./Success";
import Cancel from "./Cancel";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tickets, setTickets] = useState(0); // Nouvel état pour les tickets

  useEffect(() => {
    debugger;
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          debugger;
          setUsername(response.data.username);
          setIsLoggedIn(true);
          setTickets(response.data.tickets); // Mettre à jour les tickets
        })
        .catch((error) => {
          debugger;
          console.error("Error fetching user:", error);
        });
    }
  }, [tickets]);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);

    // Récupérer les informations utilisateur après la connexion
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          debugger;
          setUsername(response.data.username);
          setIsLoggedIn(true);
          setTickets(response.data.tickets);
        })
        .catch((error) => {
          debugger;
          console.error("Error fetching user:", error);
        });
    }
  };

  const handleLogout = () => {
    axiosInstance
      .post(
        "/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        setUsername("");
        setIsLoggedIn(false);
        setTickets(0); // Réinitialiser les tickets lors de la déconnexion
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  };

  const updateTickets = (newTicketCount) => {
    setTickets(newTicketCount); // Méthode pour mettre à jour les tickets
  };

  return (
    <Router>
      <div className="background">
        <NavBar
          username={username}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          tickets={tickets} // Passer les tickets à NavBar
        />
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/scrap" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/scrap" replace /> : <Signup />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/scrap"
            element={
              isLoggedIn ? (
                <Scrap updateTickets={updateTickets} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/history"
            element={
              isLoggedIn ? <History /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/shop"
            element={
              isLoggedIn ? (
                <Shop updateTickets={updateTickets} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/shop/success"
            element={<Success updateTickets={updateTickets} />}
          />
          <Route path="/shop/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
