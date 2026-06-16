import { useState } from "react";
import Flashcard from "./Flashcard";
import "./App.css";

const cards = [
  { question: "Hello", answer: "Hola" },
  { question: "Goodbye", answer: "Adiós" },
  { question: "Thank you", answer: "Gracias" },
  { question: "Please", answer: "Por favor" },
  { question: "Sorry", answer: "Lo siento" },
  { question: "Where is the bathroom?", answer: "¿Dónde está el baño?" },
  { question: "How much does it cost?", answer: "¿Cuánto cuesta?" },
  { question: "I don't understand", answer: "No entiendo" },
];

function getRandomIndex(currentIndex, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === currentIndex);
  return next;
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex(getRandomIndex(currentIndex, cards.length));
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    setIsFlipped(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>English to Spanish</h1>
        <p className="description">
          Tap a card to reveal the Spanish translation.
        </p>
        <span className="card-count">{cards.length} cards</span>
      </header>
      <main>
        <Flashcard
          card={cards[currentIndex]}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((prev) => !prev)}
        />
        <div className="buttons">
          <button className="nav-btn" onClick={handlePrev}>Back</button>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </div>
      </main>
    </div>
  );
}