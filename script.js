// Example words array
let words = ["hangman", "javascript", "programming", "web", "game"];

// Pick a random word
let word = words[Math.floor(Math.random() * words.length)];

// Create blanks for the word
let blanks = word.split("").map(letter => "_").join(" ");

// Display the blanks
document.getElementById("word-to-guess").textContent = blanks;

let guessedLetters = [];
let remainingGuesses = 6; // Number of guesses allowed

// Array of images to show as the body parts (in order)
let bodyParts = [
  "images/Gallows1.png",   // Initial gallows (no body parts)
  "images/Head1.png",      // Head
  "images/Body1.png",      // Body
  "images/Left_Arm1.png",  // Left Arm
  "images/Right_Arm1.png", // Right Arm
  "images/Left_Leg1.png",  // Left Leg
  "images/Right_Leg1.png"  // Right Leg
];

// Update the word display based on guesses
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

// Update the gallows (stick figure) image based on wrong guesses
function updateGallows() {
  let gallowsImage = bodyParts[6 - remainingGuesses]; // Get the next part of the body
  document.getElementById("gallows-image").src = gallowsImage;
}

// Guess button functionality
document.getElementById("guess-button").addEventListener("click", function() {
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
});
