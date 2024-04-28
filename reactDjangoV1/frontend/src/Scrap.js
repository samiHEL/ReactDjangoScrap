import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BeatLoader } from 'react-spinners';  // Importer le spinner de react-spinners

const Scrap = () => {
  const [brand, setBrand] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);  // État pour le chargement

  const handleSubmit = () => {
    if (!brand || !city) {
      alert('Tous les champs doivent être remplis.');
      return;
    }
    setLoading(true);  // Commence le chargement
    axios.post('http://localhost:8000/api/submit', { brand, city }, { responseType: 'blob' })
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

  return (
    <div className="form-container">
      <div className="form-box">
        <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enseigne à scraper" />
        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Nom de la Ville" />
        <button onClick={handleSubmit} disabled={loading}>
          Submit
        </button>
        {loading && <BeatLoader size={15} color={"#36D7B7"} />}  
      </div>
    </div>
  );
};

export default Scrap;
