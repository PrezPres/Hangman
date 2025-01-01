// Existing setup for game variables
let words = ["hangman", "javascript", "programming", "web", "game"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingGuesses = 6; // Default to normal difficulty
let unguessedLetters = word.split('').filter(letter => !guessedLetters.includes(letter));

// Difficulty levels
const difficultyLevels = {
  easy: 9,    // Easy difficulty: 9 guesses
  normal: 6,  // Normal difficulty: 6 guesses
  hard: 3     // Hard difficulty: 3 guesses
};

// Set difficulty based on user selection
function setDifficulty(difficulty) {
  remainingGuesses = difficultyLevels[difficulty] || difficultyLevels.normal;
  updateRemainingGuesses();
}

// Update the word display based on guesses
function updateWordDisplay() {
  let displayedWord = word.split("").map(letter => {
    return guessedLetters.includes(letter) ? letter : "_";
  }).join(" ");

  document.getElementById("word-to-guess").textContent = displayedWord;

  // Check if the player has won
  if (!displayedWord.includes("_")) {
    document.getElementById("message").textContent = "You won!";
  }
}

// Update the gallows (stick figure) image based on wrong guesses
function updateGallows() {
  let gallowsImage = bodyParts[6 - remainingGuesses]; // Get the next part of the body
  document.getElementById("gallows-image").src = gallowsImage;
}

// Guess button functionality
document.getElementById("guess-button").addEventListener("click", function() {
  handleGuess();
});

// Allow Enter key to submit the guess
document.getElementById("guess-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission (if in a form)
    handleGuess();
  }
});

// Function to handle the guess logic
function handleGuess() {
  let guess = document.getElementById("guess-input").value.toLowerCase();
  if (guess && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    if (word.includes(guess)) {
      // Correct guess
    } else {
      remainingGuesses--;
      updateGallows();  // Update the image based on wrong guesses
    }

    // Clear the input field
    document.getElementById("guess-input").value = "";

    // Update the word display
    updateWordDisplay();

    // Check if player has lost
    if (remainingGuesses === 0) {
      document.getElementById("message").textContent = "You Lost!";
      displayUnguessedLetters();
    }
  }

  // Set focus back to the "Enter a letter" textbox after guess
  document.getElementById("guess-input").focus();
}

// Function to display unguessed letters in red
function displayUnguessedLetters() {
  let unguessed = word.split("").filter(letter => !guessedLetters.includes(letter)).join("");
  document.getElementById("unguessed-letters").innerHTML = `Unguessed Letters: <span style="color: red;">${unguessed}</span>`;
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", function() {
  resetGame();
});

// Function to reset the game
function resetGame() {
  // Reset game variables
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  remainingGuesses = 6; // Default to normal difficulty

  // Reset the word display
  updateWordDisplay();

  // Reset the gallows image
  document.getElementById("gallows-image").src = "images/Gallows0.png";

  // Reset the remaining guesses and guessed letters display
  updateRemainingGuesses();
  document.getElementById("guessed-letters").textContent = "Guessed Letters: ";

  // Clear the input field
  document.getElementById("guess-input").value = "";

  // Reset the message and unguessed letters display
  document.getElementById("message").textContent = "";
  document.getElementById("unguessed-letters").textContent = "";

  // Set focus back to the "Enter a letter" textbox after reset
  document.getElementById("guess-input").focus();
}

// Update the remaining guesses text
function updateRemainingGuesses() {
  document.getElementById("remaining-guesses").textContent = `Remaining Guesses: ${remainingGuesses}`;
}

// Add event listeners for difficulty change
document.getElementById("difficulty-easy").addEventListener("click", function() {
  setDifficulty("easy");
});
document.getElementById("difficulty-normal").addEventListener("click", function() {
  setDifficulty("normal");
});
document.getElementById("difficulty-hard").addEventListener("click", function() {
  setDifficulty("hard");
});
