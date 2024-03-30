import { useState } from "react";
import "./App.css";
import CardGrid from "./CardGrid";

const CardImages = [
  { src: "images/Book.png" },
  { src: "images/Helmet.png" },
  { src: "images/Knife.png" },
  { src: "images/Map.png" },
  { src: "images/Potion.png" },
  { src: "images/Shield.png" },
  { src: "images/Skull.png" },
  { src: "images/Sword.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={shuffleCards}>New Game</button>
      <CardGrid cards={cards} />
    </div>
  );
}

export default App;
