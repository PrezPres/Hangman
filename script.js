// Game variables
let words = ["hangman", "javascript", "programming", "web", "game"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];  // Track all guessed letters (correct and incorrect)
let incorrectGuesses = []; // Track incorrect guesses only
let correctGuesses = [];   // Track correct guesses only
let remainingGuesses = 6;  // Default to normal difficulty
let isGameOver = false;    // Flag to check if the game is over

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
    return correctGuesses.includes(letter) ? letter : "_";
  }).join(" ");

  // Check if player has won
  if (!displayedWord.includes("_")) {
    document.getElementById("message").textContent = "You won!";
    isGameOver = true; // Stop the game
  }

  document.getElementById("word-to-guess").innerHTML = displayedWord;
}

// Function to handle game-over scenarios
function handleGameOver() {
  if (remainingGuesses === 0) {
    document.getElementById("message").textContent = "You Lost!";
    displayMissedLetters(); // Display missed letters in red
    isGameOver = true; // Stop the game
  }
}

// Update the gallows (stick figure) image based on wrong guesses
function updateGallows() {
  let gallowsImage = `images/Gallows${6 - remainingGuesses}.png`; // Use the current remaining guesses to update the image
  document.getElementById("gallows-image").src = gallowsImage;
}

// Guess button functionality
document.getElementById("guess-button").addEventListener("click", function() {
  if (!isGameOver) {
    handleGuess();
  }
});

// Allow Enter key to submit the guess
document.getElementById("guess-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !isGameOver) {
    event.preventDefault(); // Prevent form submission (if in a form)
    handleGuess();
  }
});

// Function to handle the guess logic
function handleGuess() {
  let guess = document.getElementById("guess-input").value.toLowerCase();

  // Check if the guess is valid and not already guessed
  if (guess && !guessedLetters.includes(guess) && !incorrectGuesses.includes(guess) && !correctGuesses.includes(guess)) {
    guessedLetters.push(guess);  // Add to total guesses
    if (word.includes(guess)) {
      // Correct guess, add it to the correct guesses
      correctGuesses.push(guess);
    } else {
      // Incorrect guess, reduce remaining guesses and update gallows
      incorrectGuesses.push(guess);
      remainingGuesses--;
      updateGallows();
    }

    // Clear the input field
    document.getElementById("guess-input").value = "";

    // Update the word display
    updateWordDisplay();

    // Update guessed letters (only incorrect ones here)
    document.getElementById("guessed-letters").textContent = `Guessed Letters (Incorrect): ${incorrectGuesses.join(", ")}`;

    // Update remaining guesses
    updateRemainingGuesses();

    // Check if player has lost
     if (remainingGuesses === 0) {
    document.getElementById("message").textContent = "You Lost!";
    displayMissedLetters(); // Show the word with missed letters in red
    isGameOver = true; // Stop the game
  }
  }

  // Set focus back to the "Enter a letter" textbox after guess
  document.getElementById("guess-input").focus();
}

// Update the remaining guesses text
function updateRemainingGuesses() {
  document.getElementById("remaining-guesses").textContent = `Remaining Guesses: ${remainingGuesses}`;
}

// Function to display the word with missed letters in red when the game is lost
function displayMissedLetters() {
  let displayedWord = word.split("").map((letter) => {
    if (correctGuesses.includes(letter)) {
      // Correctly guessed letter
      return letter;
    } else {
      // Missed letter (display in red)
      return `<span style="color: red;">${letter}</span>`;
    }
  }).join(" ");

  // Update the word display with missed letters
  document.getElementById("word-to-guess").innerHTML = displayedWord;
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
  correctGuesses = [];
  remainingGuesses = 6; // Default to normal difficulty
  isGameOver = false; // Reset game over flag

  // Reset the word display
  updateWordDisplay();

  // Reset the gallows image
  document.getElementById("gallows-image").src = "images/Gallows0.png";

  // Reset the remaining guesses and guessed letters display
  updateRemainingGuesses();
  document.getElementById("guessed-letters").textContent = "Guessed Letters (Incorrect): ";

  // Clear the input field
  document.getElementById("guess-input").value = "";

  // Reset the message
  document.getElementById("message").textContent = "";

  // Set focus back to the "Enter a letter" textbox after reset
  document.getElementById("guess-input").focus();
}

// Add event listeners for difficulty change
document.addEventListener("DOMContentLoaded", function () {
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
  let remainingGuessesMap = {
    easy: 10,
    normal: 6,
    hard: 4,
  };

  // Function to handle difficulty selection
  function selectDifficulty(difficulty) {
    // Remove the "selected" class from all buttons
    difficultyButtons.forEach(button => button.classList.remove("selected"));

    // Add the "selected" class to the clicked button
    document.getElementById(`${difficulty}-button`).classList.add("selected");

    // Adjust remaining guesses
    let previousGuesses = 6 - remainingGuesses;
    remainingGuesses = Math.max(remainingGuessesMap[difficulty] - previousGuesses, 0);

    // Update the UI
    updateGuessesDisplay();
  }

  // Attach event listeners to difficulty buttons
  difficultyButtons.forEach(button => {
    button.addEventListener("click", function () {
      let difficulty = this.id.replace("-button", ""); // Extract difficulty (easy, normal, hard)
      selectDifficulty(difficulty);
    });
  });

  // Initialize the default difficulty
  selectDifficulty("normal");
});

