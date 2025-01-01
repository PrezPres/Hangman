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
      alert(`Wrong guess! Remaining guesses: ${remainingGuesses}`);
      updateGallows();  // Update the image based on wrong guesses
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
  remainingGuesses = 6;
  
  // Reset the word display
  updateWordDisplay();

  // Reset the gallows image
  document.getElementById("gallows-image").src = "images/Gallows0.png";

  // Reset the remaining guesses and guessed letters display
  document.getElementById("remaining-guesses").textContent = `Remaining Guesses: ${remainingGuesses}`;
  document.getElementById("guessed-letters").textContent = "Guessed Letters: ";

  // Clear the input field
  document.getElementById("guess-input").value = "";

  // Set focus back to the "Enter a letter" textbox after reset
  document.getElementById("guess-input").focus();
}
