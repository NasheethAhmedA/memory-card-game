import React from "react";
import Card from "./Card";
import "./CardGrid.css";

const CardGrid = ({ cards }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
