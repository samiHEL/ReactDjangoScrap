import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { loadStripe } from "@stripe/stripe-js";

import './Shop.css';

const stripePromise = loadStripe(
  "pk_test_51LPtT9LIqjQ7Sl29dC93bDHkuaBVwN73rmQNeJPyQL2vnRAZ1TjYk9y4L8w9RmEV50mYKDUbDx0KLXWZRODi2XMg00Kg8uq8on"
);

const Shop = ({ updateTickets }) => {
  const [tickets, setTickets] = useState(0);

  const handleBuyTickets = async (tickets) => {
    const token = localStorage.getItem("token"); // Récupérer le token de localStorage
    if (!token) {
      alert("You need to log in first");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/create_checkout_session",
        { tickets: parseInt(tickets, 10) }, // Convertir en entier
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe Checkout Error: ", error);
        alert("Achat échoué : " + error.message);
      }
    } catch (error) {
      alert(
        "Achat échoué: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleBuyCustomTickets = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first");
      return;
    }

    axiosInstance.post("/api/buy_tickets", { tickets: parseInt(tickets, 10) }, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      alert('Tickets purchased successfully');
      updateTickets(response.data.tickets); // Mettre à jour les tickets après l'achat
    })
    .catch(error => {
      alert('Purchase failed: ' + (error.response ? error.response.data : error.message));
    });
  };

  return (
    <div className="shop-container">
      <h1>Acheter des tickets</h1>
      <div className="shop-cards">
        <div className="shop-card">
          <h2>5 Tickets</h2>
          <p>Testez les versions de scraping medium et premium avec 5 tickets.</p>
          <div className="price">4.99€</div>
          <button onClick={() => handleBuyTickets(5)}>Acheter</button>
        </div>
        <div className="shop-card">
          <h2>15 Tickets</h2>
          <p>Testez les versions de scraping medium et premium avec 15 tickets.</p>
          <div className="price">14.99€</div>
          <button onClick={() => handleBuyTickets(15)}>Acheter</button>
        </div>
        <div className="shop-card">
          <h2>30 Tickets</h2>
          <p>Testez les versions de scraping medium et premium avec 30 tickets.</p>
          <div className="price">29.99€</div>
          <button onClick={() => handleBuyTickets(30)}>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
