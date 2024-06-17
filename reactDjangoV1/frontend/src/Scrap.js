import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig";
import "./App.css";
import { BeatLoader } from "react-spinners";

// Ajout de updateTickets en prop
const Scrap = ({ updateTickets }) => {
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapType, setScrapType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!brand || !city) {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    setLoading(true);
    let apiRoute = "";
    switch (scrapType) {
      case "medium":
        apiRoute = "/api/submit_form_medium";
        break;
      case "premium":
        apiRoute = "/api/submit_form_prenium";
        break;
      default:
        apiRoute = "/api/submit_form_basique";
    }

    axiosInstance
      .post(
        apiRoute,
        { brand, city },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Important: indiquez à axios de traiter la réponse comme un blob
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "result.csv"); // Nom du fichier téléchargé
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          // Mettre à jour les tickets après le scraping
          axiosInstance
            .get("/api/user/", {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              debugger;
              updateTickets(response.data.tickets);
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
            });
        } else {
          alert(
            "Erreur: la réponse du serveur n'est pas conforme aux attentes."
          );
        }
        setLoading(false);
      })
      .catch(async (error) => {
        debugger;
        if (
          error.response &&
          error.response.data &&
          error.response.data.type === "application/json"
        ) {
          const text = await error.response.data.text();
          const errorMessage = JSON.parse(text).message;
          if (window.confirm(`${errorMessage}`)) {
            navigate("/shop");
          } else {
            navigate("/scrap");
          }
        } else {
          alert("Une erreur est survenue lors de la soumission.");
        }
        setLoading(false);
      });
  };

  const renderForm = () => (
    <div className="form-box">
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enseigne à scraper"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Nom de la Ville"
      />
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
            <button
              className="glow-on-hover"
              onClick={() => setScrapType("basique")}
            >
              Scrap Basique
            </button>
          </div>
          <div className="button-block">
            <button
              className="glow-on-hover"
              onClick={() => setScrapType("medium")}
            >
              Scrap Medium
            </button>
          </div>
          <div className="button-block">
            <button
              className="glow-on-hover"
              onClick={() => setScrapType("premium")}
            >
              Scrap Premium
            </button>
          </div>
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Scrap;
