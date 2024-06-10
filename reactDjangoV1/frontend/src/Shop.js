import React, { useState } from 'react';
import axiosInstance from './axiosConfig';

const Shop = () => {
  const [tickets, setTickets] = useState(0);

  const handleBuyTickets = () => {
    const token = localStorage.getItem('token'); // Récupérer le token de localStorage
    if (!token) {
      alert('You need to log in first');
      return;
    }

    axiosInstance.post('/api/buy_tickets', { tickets: parseInt(tickets, 10) }, { // Convert to integer
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
      <h1>Buy Tickets</h1>
      <input
        type="number"
        value={tickets}
        onChange={e => setTickets(e.target.value)}
        placeholder="Number of tickets"
      />
      <button onClick={handleBuyTickets}>Buy Tickets</button>
    </div>
  );
};

export default Shop;
