import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BeatLoader } from 'react-spinners';  // Importer le spinner de react-spinners

const Scrap = () => {
  const [brand, setBrand] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);  // État pour le chargement
  const [scrapType, setScrapType] = useState('');  // État pour le type de scraping

  const handleSubmit = () => {
    if (!brand || !city) {
      alert('Tous les champs doivent être remplis.');
      return;
    }
    setLoading(true);  // Commence le chargement
    let apiRoute = '';
    switch(scrapType) {
      case 'medium':
        apiRoute = 'http://localhost:8000/api/submit_medium';
        break;
      case 'premium':
        apiRoute = 'http://localhost:8000/api/submit_prenium';
        break;
      default:
        apiRoute = 'http://localhost:8000/api/submit';
    }

    axios.post(apiRoute, { brand, city }, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setLoading(false);  // Arrête le chargement après téléchargement
      })
      .catch(error => {
        alert('Submission failed: ' + error.message);
        setLoading(false);  // Arrête le chargement en cas d'erreur
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
            <button className="glow-on-hover" onClick={() => setScrapType('basic')}>Scrap Basique</button>
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
