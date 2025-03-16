export function getCorrectGuessMessages() {
  const options = [
    `Way to go!`,
    `Nice guess!`,
    `Good job, you're closing in!`,
    `Sweet spot acquired!`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
