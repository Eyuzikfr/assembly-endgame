import "../css/Header.css";

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <h1 id="header-title">Assembly: Endgame</h1>
        <p id="title-para">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </div>
      <div className="status-message">“Farewell HTML & CSS” 🫡 </div>
    </header>
  );
}
