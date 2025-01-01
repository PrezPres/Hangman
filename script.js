// Game variables
let word = '';  // The word to guess, will be fetched from the API
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

// Fetch a random word from an API
function fetchRandomWord() {
  fetch('https://random-word-api.herokuapp.com/word?number=1')  // Random word API
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Log the response data for debugging
      if (data && data.length > 0) {
        word = data[0].toLowerCase();  // Set the word to the random word from API
        startGame();
      } else {
        alert('Failed to fetch a random word. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error fetching random word:', error);
      alert('There was an error fetching a random word.');
    });
}


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

  if (!displayedWord.includes("_")) {
    document.getElementById("message").textContent = "You won!";
    isGameOver = true;
  }

  document.getElementById("word-to-guess").innerHTML = displayedWord;
}

// Handle game-over scenarios
function handleGameOver() {
  if (remainingGuesses === 0) {
    document.getElementById("message").textContent = "You Lost!";
    displayMissedLetters();
    isGameOver = true;
  }
}

// Update the gallows image
function updateGallows() {
  let gallowsImage = `images/Gallows${6 - remainingGuesses}.png`;
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
    event.preventDefault();
    handleGuess();
  }
});

function handleGuess() {
  let guess = document.getElementById("guess-input").value.toLowerCase();

  if (guess && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    if (word.includes(guess)) {
      correctGuesses.push(guess);
    } else {
      incorrectGuesses.push(guess);
      remainingGuesses--;
      updateGallows();
    }

    document.getElementById("guess-input").value = "";
    updateWordDisplay();
    document.getElementById("guessed-letters").textContent = `Guessed Letters (Incorrect): ${incorrectGuesses.join(", ")}`;
    updateRemainingGuesses();

    if (remainingGuesses === 0) {
      document.getElementById("message").textContent = "You Lost!";
      displayMissedLetters();
      isGameOver = true;
    }
  }

  document.getElementById("guess-input").focus();
}

function updateRemainingGuesses() {
  document.getElementById("remaining-guesses").textContent = `Remaining Guesses: ${remainingGuesses}`;
}

function displayMissedLetters() {
  let displayedWord = word.split("").map(letter => {
    return correctGuesses.includes(letter) ? letter : `<span style="color: red;">${letter}</span>`;
  }).join(" ");

  document.getElementById("word-to-guess").innerHTML = displayedWord;
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", resetGame);

function resetGame() {
  fetchRandomWord();  // Fetch a new random word from the API
  guessedLetters = [];
  incorrectGuesses = [];
  correctGuesses = [];
  remainingGuesses = difficultyLevels.normal; // Reset to normal difficulty
  isGameOver = false;

  document.getElementById("gallows-image").src = "images/Gallows0.png";
  updateRemainingGuesses();
  document.getElementById("guessed-letters").textContent = "Guessed Letters (Incorrect): ";
  document.getElementById("guess-input").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").focus();

  // Reset difficulty buttons to "Normal"
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
  difficultyButtons.forEach(button => button.classList.remove("selected"));
  document.getElementById("normal-button").classList.add("selected");
}

document.addEventListener("DOMContentLoaded", function () {
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
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

  selectDifficulty("normal");

  // Fetch the first random word when the page loads
  fetchRandomWord();
});
