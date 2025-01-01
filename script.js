// List of words for the game
let words = ["hangman", "javascript", "programming", "web", "game"];

// Game variables
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let incorrectGuesses = [];
let remainingGuesses = 6; // Default easy difficulty

// Difficulty levels
const difficultyLevels = {
  easy: 6,
  medium: 5,
  hard: 4
};

// Body part images for the gallows (wrong guesses)
let bodyParts = [
  "images/Gallows0.png",   // Initial gallows (no body parts)
  "images/Head1.png",      // Head
  "images/Body1.png",      // Body
  "images/Left_Arm2.png",  // Left Arm
  "images/Right_Arm2.png", // Right Arm
  "images/Left_Leg2.png",  // Left Leg
  "images/Right_Leg2.png"  // Right Leg
];

// Function to update the word display
function updateWordDisplay() {
  let displayedWord = word.split("").map(letter => {
    return guessedLetters.includes(letter) ? letter : "_";
  }).join(" ");
  document.getElementById("word-to-guess").textContent = displayedWord;

  // Check if the player has won
  if (!displayedWord.includes("_")) {
    alert("You won!");
  }
}

// Function to update the gallows image based on wrong guesses
function updateGallows() {
  let gallowsImage = bodyParts[6 - remainingGuesses]; // Get the next part of the body
  document.getElementById("gallows-image").src = gallowsImage;
}

// Function to update the incorrect guesses display
function updateIncorrectGuesses() {
  document.getElementById("incorrect-guesses").textContent = incorrectGuesses.join(", ");
}

// Handle the guess logic
function handleGuess() {
  let guess = document.getElementById("guess-input").value.toLowerCase();
  if (guess && !guessedLetters.includes(guess) && !incorrectGuesses.includes(guess)) {
    guessedLetters.push(guess);
    if (word.includes(guess)) {
      // Correct guess, nothing extra needed
    } else {
      remainingGuesses--;
      incorrectGuesses.push(guess);
      updateGallows();  // Update the image based on wrong guesses
      updateIncorrectGuesses(); // Update incorrect guesses list
    }

    // Clear the input field
    document.getElementById("guess-input").value = "";

    // Update the word display
    updateWordDisplay();

    // Check if player has lost
    if (remainingGuesses === 0) {
      alert("You lost! The word was: " + word);
    }
  }

  // Set focus back to the "Enter a letter" textbox after guess
  document.getElementById("guess-input").focus();
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
  incorrectGuesses = [];
  remainingGuesses = difficultyLevels[document.getElementById("difficulty").value] || 6;

  // Reset the word display
  updateWordDisplay();

  // Reset the gallows image
  document.getElementById("gallows-image").src = "images/Gallows0.png";

  // Reset the incorrect guesses display
  updateIncorrectGuesses();

  // Clear the input field
  document.getElementById("guess-input").value = "";

  // Set focus back to the "Enter a letter" textbox after reset
  document.getElementById("guess-input").focus();
}

// Hint button functionality
document.getElementById("hint-button").addEventListener("click", function() {
  alert("The first letter of the word is: " + word.charAt(0).toUpperCase());
});

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

// Focus management: Set focus back to the "Enter a letter" textbox after a guess or reset
document.getElementById("guess-input").focus();
