import Header from "./components/Header";
import { languages } from "./components/languages";
import { useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import "./css/App.css";

export default function App() {
  // state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived values
  const wrongGuessesArray = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );
  const wrongGuessCount = wrongGuessesArray.length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  console.log("game won: " + isGameWon);
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  console.log(isGameOver);

  // static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount ? true : false;
    const lostClass = clsx({
      language: true,
      lost: isLanguageLost,
    });
    return (
      <span
        key={nanoid()}
        className={"language " + lostClass}
        style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
      >
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    return (
      <div key={index} className="letter">
        {isGuessed ? letter.toUpperCase() : ""}
      </div>
    );
  });

  const addGuessedLetter = (letter) => {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };

  const keyboardElements = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.split("").includes(letter);
    const isWrong = isGuessed && !currentWord.split("").includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={index}
        onClick={() => addGuessedLetter(letter)}
        value={letter.toUpperCase()}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <div className="header-and-status">
        <Header />
        <div className="status-message">
          <h2 className="main-status">You win!</h2>
          <p className="sub-status">Well done! 🎉</p>
        </div>
      </div>
      <div className="languages-container">{languageElements}</div>
      <div className="word-display">{letterElements}</div>
      <div className="keyboard">{keyboardElements}</div>
      {isGameOver && <button className="new-game-btn">New Game</button>}
    </main>
  );
}
