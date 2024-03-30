import React from "react";
import "./Card.css";

export default function Card({ card }) {
  return (
    <div key={card.id} className="card">
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="images/Back.png" alt="card back" />
    </div>
  );
}
