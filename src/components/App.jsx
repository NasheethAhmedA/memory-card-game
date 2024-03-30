import { useEffect, useRef, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import "./App.css";
import CardGrid from "./CardGrid";

const selectAudio = new Audio("sfx/select.wav")
selectAudio.volume = 0.5;
const matchAudio = new Audio("sfx/match.wav");
matchAudio.volume = 0.5;
const winAudio = new Audio("sfx/win.wav");
winAudio.volume = 0.5;

const CardImages = [
  { src: "images/Book.png", matched: false },
  { src: "images/Helmet.png", matched: false },
  { src: "images/Knife.png", matched: false },
  { src: "images/Map.png", matched: false },
  { src: "images/Potion.png", matched: false },
  { src: "images/Shield.png", matched: false },
  { src: "images/Skull.png", matched: false },
  { src: "images/Sword.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const winScreenRef = useRef(null);

  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  const handleChoice = (card) => {
    selectAudio.play();
    choice1 ? setChoice2(card) : setChoice1(card);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      winAudio.play();
      pause();
      winScreenRef.current.style.display = "flex";
    }
  }, [cards]);

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choice1.src || card.src === choice2.src) {
              matchAudio.play();
              return { ...card, matched: true };
            }
            return card;
          })
        );
        resetChoices();
      } else {
        setTimeout(() => {
          resetChoices();
        }, 700);
      }
    }
  }, [choice1, choice2]);

  //reset choices
  const resetChoices = () => {
    setChoice1(null);
    setChoice2(null);
  };

  // Shuffle the cards
  const shuffleCards = () => {
    winScreenRef.current.style.display = "none";
    const shuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoice1(null);
    setChoice2(null);
    setTurns(0);
    reset();
  };

  useEffect(() => {
    shuffleCards();
    start();
  }, []);

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="middle">
        <h2 className="left">Turns: {turns}</h2>
        <br />
        <h2>
          Timer: {"\t"}
          {minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </h2>
      </div>
      <CardGrid
        className="middle"
        cards={cards}
        handleChoice={handleChoice}
        choiceOne={choice1}
        choiceTwo={choice2}
      />

      <div className="win" ref={winScreenRef}>
        <h1>You Won!</h1>
        <button onClick={shuffleCards}>New Game</button>
      </div>
    </div>
  );
}

export default App;
