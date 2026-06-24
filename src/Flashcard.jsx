export default function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div className="card-scene" onClick={onFlip}>
      <div className={`card-face ${isFlipped ? "back" : ""}`}>
        <span className="card-label">{isFlipped ? "Espanol" : "English"}</span>
        <p className="card-text">{isFlipped ? card.answer : card.question}</p>
        <span className="card-hint">{isFlipped ? "tap to flip back" : "tap to flip"}</span>
      </div>
    </div>
  );
}