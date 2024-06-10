import React, { useState } from 'react';
import axiosInstance from './axiosConfig';
import './App.css';
import { BeatLoader } from 'react-spinners';

const Scrap = () => {
  const [brand, setBrand] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [scrapType, setScrapType] = useState('');

  const handleSubmit = () => {
    if (!brand || !city) {
      alert('Tous les champs doivent être remplis.');
      return;
    }
    setLoading(true);
    let apiRoute = '';
    switch(scrapType) {
      case 'medium':
        apiRoute = '/api/submit_form_medium';
        break;
      case 'premium':
        apiRoute = '/api/submit_form_prenium';
        break;
      default:
        apiRoute = '/api/submit_form_basique';
    }

    axiosInstance.post(apiRoute, { brand, city }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert(response.data.message);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setLoading(false);
      })
      .catch(error => {
        alert('Submission failed: ' + error.response.data.message);
        setLoading(false);
      });
  };

  const renderForm = () => (
    <div className="form-box">
      <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enseigne à scraper" />
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Nom de la Ville" />
      <button onClick={handleSubmit} disabled={loading}>
        Submit
      </button>
      {loading && <BeatLoader size={15} color={"#36D7B7"} />}  
    </div>
  );

  return (
    <div className="form-container">
      {!scrapType ? (
        <div className="button-container">
          <div className="button-block">
            <button className="glow-on-hover" onClick={() => setScrapType('basique')}>Scrap Basique</button>
          </div>
          <div className="button-block">
            <button className="glow-on-hover" onClick={() => setScrapType('medium')}>Scrap Medium</button>
          </div>
          <div className="button-block">
            <button className="glow-on-hover" onClick={() => setScrapType('premium')}>Scrap Premium</button>
          </div>
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Scrap;
