import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "./axiosConfig";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axiosInstance
      .post("/api/login", { username, password })
      .then((response) => {
        alert("Login successful");
        const { token } = response.data;
        localStorage.setItem("token", token);
        // Appeler onLogin après avoir récupéré les informations utilisateur
        axiosInstance
          .get("/api/user/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((userResponse) => {
            debugger;
            onLogin(username, userResponse.data.tickets);
            navigate("/scrap"); // Redirect to scrapping page after login
          })
          .catch((error) => {
            debugger;
            alert("Failed to fetch user info: " + error.response.data);
          });
      })
      .catch((error) => {
        alert("Login failed: " + error.response.data);
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
