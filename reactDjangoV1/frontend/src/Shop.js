import React, { useState } from 'react';
import axiosInstance from './axiosConfig';
import './Shop.css';

const Shop = () => {
  const [tickets, setTickets] = useState(0);

  const handleBuyTickets = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first');
      return;
    }

    axiosInstance.post('/api/buy_tickets', { tickets: parseInt(tickets, 10) }, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      alert('Tickets purchased successfully');
    })
    .catch(error => {
      alert('Purchase failed: ' + (error.response ? error.response.data : error.message));
    });
  };

  return (
    <div className="shop-container">
      <h1 className="shop-title">Buy Tickets</h1>
      <div className="ticket-info">
        <h2>Ticket Price: $10</h2>
        <p>Buy tickets for our events and enjoy exclusive access!</p>
      </div>
      <div className="ticket-purchase">
        <input
          type="number"
          value={tickets}
          onChange={e => setTickets(e.target.value)}
          placeholder="Number of tickets"
          min="1"
        />
        <button onClick={handleBuyTickets}>Buy Tickets</button>
      </div>
    </div>
  );
};

export default Shop;
