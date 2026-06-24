import { useState } from "react";
import Flashcard from "./Flashcard";
import "./App.css";

const initialCards = [
  { question: "Hello", answer: "Hola" },
  { question: "Goodbye", answer: "Adios" },
  { question: "Thank you", answer: "Gracias" },
  { question: "Please", answer: "Por favor" },
  { question: "Sorry", answer: "Lo siento" },
  { question: "Where is the bathroom?", answer: "Donde esta el bano?" },
  { question: "How much does it cost?", answer: "Cuanto cuesta?" },
  { question: "I don't understand", answer: "No entiendo" },
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

export default function App() {
  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [guessResult, setGuessResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setGuess("");
      setGuessResult(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setGuess("");
      setGuessResult(null);
    }
  };

  const handleShuffle = () => {
    setCards(shuffleArray(initialCards));
    setCurrentIndex(0);
    setIsFlipped(false);
    setGuess("");
    setGuessResult(null);
  };

  const handleSubmit = () => {
    const correct = normalize(cards[currentIndex].answer);
    const userGuess = normalize(guess);
    if (userGuess === correct) {
      setGuessResult("correct");
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setGuessResult("incorrect");
      setStreak(0);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>English to Spanish</h1>
        <p className="description">
          Guess the Spanish translation then flip the card to check!
        </p>
        <span className="card-count">{cards.length} cards</span>
      </header>

      <div className="streak-bar">
        <span>Current Streak: {streak}</span>
        <span>Longest Streak: {longestStreak}</span>
      </div>

      <main>
        <Flashcard
          card={cards[currentIndex]}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((prev) => !prev)}
        />

        <div className="guess-section">
          <input
            className={`guess-input ${guessResult ? guessResult : ""}`}
            type="text"
            placeholder="Type your guess in Spanish..."
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setGuessResult(null);
            }}
          />
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          {guessResult === "correct" && <p className="feedback correct">Correct!</p>}
          {guessResult === "incorrect" && <p className="feedback incorrect">Incorrect, try again!</p>}
        </div>

        <div className="buttons">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Back
          </button>
          <button
            className="shuffle-btn"
            onClick={handleShuffle}
          >
            Shuffle
          </button>
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}