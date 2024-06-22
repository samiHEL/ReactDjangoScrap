import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig";
import "./Scrap.css";
import { BeatLoader } from "react-spinners";

const Scrap = ({ updateTickets }) => {
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapType, setScrapType] = useState("");
  const [expanded, setExpanded] = useState(null);
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
          if (response.data.message === undefined) {
            alert("Scraping réussi et résultats envoyés par email!");
          } else {
            alert(response.data.message);
          }
          // Mettre à jour les tickets après le scraping
          axiosInstance
            .get("/api/user/", {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              updateTickets(response.data.tickets);
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
            });
        } else {
          alert("Erreur: la réponse du serveur n'est pas conforme aux attentes.");
        }
        setLoading(false);
      })
      .catch(async (error) => {
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

  const handleViewMore = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const packages = [
    {
      title: "Scrap Basique",
      subtitle: "Basic scrapping options",
      price: "1 tickets/scrap",
      description: "Basic scrapping with limited features. Suitable for small tasks.",
      details: "Includes basic scrapping features with limited usage. Great for small tasks and personal use.",
      type: "basique",
    },
    {
      title: "Scrap Medium",
      subtitle: "Standard scrapping options",
      price: "2 tickets/scrap",
      description: "Standard scrapping with more features and higher limits.",
      details: "Includes standard scrapping features with higher usage limits. Ideal for moderate tasks and small businesses.",
      type: "medium",
    },
    {
      title: "Scrap Premium",
      subtitle: "Premium scrapping options",
      price: "5 tickets/scrap",
      description: "Premium scrapping with all features and highest limits.",
      details: "Includes all scrapping features with the highest usage limits. Perfect for large tasks and enterprises.",
      type: "premium",
    },
  ];

  return (
    <div className="scrap-page">
      <h1 className="scrap-title">Scrapping Packages</h1>
      <div className="packages">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            <h2>{pkg.title}</h2>
            <h3>{pkg.subtitle}</h3>
            <p className="price">{pkg.price}</p>
            <p>{pkg.description}</p>
            {expanded === index && (
              <>
                <p className="details">{pkg.details}</p>
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
              </>
            )}
            <button
              onClick={() => {
                setScrapType(pkg.type);
                handleViewMore(index);
              }}
            >
              {expanded === index ? "View less" : "Start Scrapping"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrap;
