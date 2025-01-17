import { Hangman } from './gameLogic.js';

const words = ["hangman", "javascript", "programming", "web", "game"];

let difficulty = 6;
const difficultySelect = document.getElementById("difficulty");
difficultySelect.addEventListener("change", () => {
  difficulty = parseInt(difficultySelect.value);
  resetGame(); // Reset game when difficulty changes
});

const word = words[Math.floor(Math.random() * words.length)];

let game = new Hangman(word, difficulty);

const gallowsImage = document.getElementById("gallows-image");
const wordToGuess = document.getElementById("word-to-guess");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const remainingGuessesDisplay = document.getElementById("remaining-guesses");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const hintDisplay = document.getElementById("hint");
const showHintButton = document.getElementById("show-hint");
const resetButton = document.getElementById("reset-button");

// Initialize game display
function updateDisplay() {
  wordToGuess.textContent = game.getDisplayedWord();
  remainingGuessesDisplay.textContent = `Remaining Guesses: ${game.remainingGuesses}`;
  guessedLettersDisplay.textContent = `Guessed Letters: ${game.guessedLetters.join(", ")}`;
  gallowsImage.src = `images/Gallows${6 - game.remainingGuesses}.png`;
}

updateDisplay();

// Handle guessing
guessButton.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase();
  const result = game.guess(guess);
  if (!result.success) {
    alert(result.message);
  } else {
    if (result.correct) {
      updateDisplay();
    } else {
      updateDisplay();
      if (game.isGameOver()) {
        alert(`You lost! The word was: ${game.word}`);
      }
    }

    if (!game.getDisplayedWord().includes("_")) {
      alert("You won!");
    }
  }
  guessInput.value = "";
});

// Show hint
showHintButton.addEventListener("click", () => {
  hintDisplay.textContent = `Hint: ${game.getHint()}`;
});

// Reset the game
resetButton.addEventListener("click", resetGame);

function resetGame() {
  const newWord = words[Math.floor(Math.random() * words.length)];
  game.resetGame(newWord, difficulty);
  updateDisplay();
  hintDisplay.textContent = "Hint: ";
  guessInput.value = "";
}
