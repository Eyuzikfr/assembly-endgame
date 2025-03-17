import Header from "./components/Header";
import { languages } from "./components/languages";
import { useState } from "react";
import { nanoid } from "nanoid";
import {
  getFarewellText,
  getCorrectGuessMessages,
  getWord,
} from "./components/utils";
import clsx from "clsx";
import ReactConfetti from "react-confetti";
import "./css/App.css";

/**
 *
 * *Remaining impelementations
 * ✅ farewell messages in status section
 * ✅ disable keyboard when the game is over
 * ✅ fix a11y issues
 * ✅ choose a random word from a list of words
 * ✅ make the new game button work
 * ✅ reveal the missing letters if the user loses
 * ✅ confetti drop when the user wins
 */

export default function App() {
  // get a random word
  const word = getWord();

  // state values
  const [currentWord, setCurrentWord] = useState(word);
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived values
  const remainingGuesses = languages.length - 1;
  const wrongGuessesArray = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );
  const wrongGuessCount = wrongGuessesArray.length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.split("").includes(lastGuessedLetter);

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
    const letterStatus = clsx({
      letter: true,
      unguessed: isGameOver && !isGuessed,
      allGuessed: isGameWon,
    });
    return (
      <div key={index} className={letterStatus}>
        {isGuessed
          ? letter.toUpperCase()
          : isGameOver
          ? letter.toUpperCase()
          : ""}
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
        disabled={isGameOver}
        className={className}
        key={index}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx({
    "status-message": true,
    farewell: isLastGuessIncorrect,
    "correct-guess": lastGuessedLetter && !isLastGuessIncorrect,
    won: isGameWon,
    lost: isGameLost,
  });

  const renderGameStatus = () => {
    const currentLanguage =
      languages[wrongGuessCount <= 0 ? 0 : wrongGuessCount - 1].name;

    if (isGameWon) {
      return (
        <>
          <h2 className="main-status">You win!</h2>
          <p className="sub-status">Well done! 🎉</p>
        </>
      );
    } else if (isGameLost) {
      return (
        <>
          <h2 className="main-status">Game over!</h2>
          <p className="sub-status">
            You lose! Better start learning Assembly 😭
          </p>
        </>
      );
    } else if (isLastGuessIncorrect) {
      return (
        <h2 className="main-status">{getFarewellText(currentLanguage)}</h2>
      );
    } else {
      if (lastGuessedLetter) {
        return <h2 className="main-status">{getCorrectGuessMessages()}</h2>;
      }
    }
  };

  const startNewGame = () => {
    setCurrentWord(getWord());
    setGuessedLetters([]);
  };

  return (
    <main>
      {isGameWon && <ReactConfetti />}
      <div className="header-and-status">
        <Header />
        <div aria-live="polite" role="status" className={gameStatusClass}>
          {renderGameStatus()}
        </div>
      </div>
      <div className="languages-container">{languageElements}</div>
      <div className="word-display">{letterElements}</div>

      {/* combined visually-hidden aria-live region for status updates */}
      <div className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! ${lastGuessedLetter} is in the word.`
            : `Wrong! ${lastGuessedLetter} is not in the word.`}
          You have {remainingGuesses} guesses left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </div>
      <div className="keyboard">{keyboardElements}</div>
      {isGameOver && (
        <button onClick={startNewGame} className="new-game-btn">
          New Game
        </button>
      )}
    </main>
  );
}
