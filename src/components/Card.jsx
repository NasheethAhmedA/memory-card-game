import React from "react";
import "./Card.css";

export default function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      {flipped ? (
        <img className="front" src={card.src} alt="card front" />
      ) : (
        <img
          className="back"
          src="images/Back.png"
          alt="card back"
          onClick={handleClick}
        />
      )}
    </div>
  );
}
