import { words } from "./words";

export function getFarewellText(language) {
  const options = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P, ${language}`,
    `We'll miss you, ${language}`,
    `Oh no, not ${language}`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export function getCorrectGuessMessages() {
  const correctGuessMessages = [
    "Spot on! You got it right! 🎯",
    "Bingo! That's the correct answer! 🎉",
    "Well done! You nailed it! ✅",
    "Fantastic guess! That's absolutely right! 👏",
    "You're on fire! That's correct! 🔥",
    "Brilliant! You guessed it! 🏆",
    "Perfect! That’s the right answer! 🎯",
    "You got it! Keep it up! 🚀",
    "Impressive! That’s spot on! 👌",
    "You're a genius! Correct answer! 🧠",
    "Amazing! You hit the bullseye! 🎯",
    "That's exactly right! Great job! 💯",
    "Yes! That's the right choice! 🎊",
    "You guessed it like a pro! 🔥",
    "Absolutely correct! Keep going! ⚡",
    "Boom! Right on the mark! 💥",
    "Correct! You're unstoppable! 🚀",
    "You crushed it! Well done! 🏅",
    "Nice work! That’s the right answer! 🎯",
    "You’re a natural! Spot on! 🎉",
  ];

  const randomIndex = Math.floor(Math.random() * correctGuessMessages.length);
  return correctGuessMessages[randomIndex];
}

export function getWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
