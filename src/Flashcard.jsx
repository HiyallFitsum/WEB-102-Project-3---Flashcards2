export default function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div className="card-scene" onClick={onFlip}>
      <div className={`card-face ${isFlipped ? "Back" : ""}`}>
        <span className="card-label">{isFlipped ? "Español" : "English"}</span>
        <p className="card-text">{isFlipped ? card.answer : card.question}</p>
        <span className="card-hint">{isFlipped ? "Tap to flip back" : "Tap to flip"}</span>
      </div>
    </div>
  );
}