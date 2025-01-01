// Define variables
let wordList = ["javascript", "hangman", "coding", "developer", "frontend"];
let chosenWord = "";
let remainingGuesses = 6;
let guessedLetters = [];
let incorrectGuesses = [];
let correctGuesses = [];
let isGameOver = false;

const difficultyLevels = {
  easy: 9,
  normal: 6,
  hard: 3,
};

// Initialize the game
document.addEventListener("DOMContentLoaded", function () {
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-button");
  const resetButton = document.getElementById("reset-button");

  // Select difficulty
  function selectDifficulty(difficulty) {
    difficultyButtons.forEach(button => button.classList.remove("selected"));
    document.getElementById(`${difficulty}-button`).classList.add("selected");
    setDifficulty(difficulty);
  }

  difficultyButtons.forEach(button => {
    button.addEventListener("click", function () {
      selectDifficulty(this.id.replace("-button", ""));
    });
  });

  // Default difficulty
  selectDifficulty("normal");

  // Handle guesses
  guessButton.addEventListener("click", handleGuess);
  guessInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleGuess();
  });

  // Handle reset game
  resetButton.addEventListener("click", function () {
    resetGame();
  });

  startGame();
});

// Start a new game
function startGame() {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
  correctGuesses = Array(chosenWord.length).fill("_");
  guessedLetters = [];
  incorrectGuesses = [];
  isGameOver = false;

  updateWordDisplay();
  updateRemainingGuesses();
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").value = "";
  document.getElementById("gallows-image").src = "images/Gallows0.png";
}

// Reset the game to default settings
function resetGame() {
  selectDifficulty("normal"); // Reset to normal difficulty
  startGame(); // Start a new game
}

// Set difficulty
function setDifficulty(difficulty) {
  remainingGuesses = difficultyLevels[difficulty];
  updateRemainingGuesses();
}

// Update the displayed word
function updateWordDisplay() {
  document.getElementById("word-display").textContent = correctGuesses.join(" ");
}

// Update remaining guesses
function updateRemainingGuesses() {
  document.getElementById("remaining-guesses").textContent = remainingGuesses;
}

// Handle a guess
function handleGuess() {
  if (isGameOver) return;

  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (!guess || guessedLetters.includes(guess)) {
    document.getElementById("message").textContent = "Invalid or repeated guess!";
    return;
  }

  guessedLetters.push(guess);

  if (chosenWord.includes(guess)) {
    chosenWord.split("").forEach((letter, index) => {
      if (letter === guess) correctGuesses[index] = letter;
    });
    updateWordDisplay();
    checkWin();
  } else {
    incorrectGuesses.push(guess);
    remainingGuesses--;
    updateRemainingGuesses();
    updateGallowsImage();
    checkLoss();
  }

  document.getElementById("guessed-letters").textContent =
    "Guessed Letters (Incorrect): " + incorrectGuesses.join(", ");
}

// Update gallows image
function updateGallowsImage() {
  const incorrectCount = incorrectGuesses.length;
  document.getElementById("gallows-image").src = `images/Gallows${incorrectCount}.png`;
}

// Check if the player wins
function checkWin() {
  if (!correctGuesses.includes("_")) {
    document.getElementById("message").textContent = "You win!";
    isGameOver = true;
  }
}

// Check if the player loses
function checkLoss() {
  if (remainingGuesses <= 0) {
    document.getElementById("message").textContent = `You lose! The word was: ${chosenWord}`;
    isGameOver = true;
  }
}
