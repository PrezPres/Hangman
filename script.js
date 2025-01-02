// Game variables
let words = [
  "apple", "banana", "grape", "cherry", "orange", "pineapple", "strawberry", "blueberry", "peach", "mango",
  "watermelon", "pear", "kiwi", "plum", "apricot", "fig", "lemon", "lime", "coconut", "pomegranate",
  "elephant", "giraffe", "tiger", "lion", "zebra", "kangaroo", "koala", "penguin", "dolphin", "whale",
  "octopus", "shark", "squid", "jellyfish", "starfish", "rabbit", "dog", "cat", "hamster", "mouse",
  "bird", "fish", "turtle", "frog", "horse", "cow", "sheep", "goat", "pig", "chicken",
  "apple", "book", "pen", "pencil", "notebook", "paper", "eraser", "ruler", "sharpener", "calculator",
  "phone", "tablet", "laptop", "computer", "headphones", "speaker", "camera", "television", "monitor", "keyboard",
  "desk", "chair", "table", "lamp", "couch", "sofa", "bed", "closet", "drawer", "mirror",
  "wall", "floor", "ceiling", "window", "door", "curtain", "carpet", "rug", "vase", "painting",
  "socks", "shirt", "pants", "dress", "shoes", "jacket", "hat", "scarf", "gloves", "scarf",
  "sun", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "fog", "storm",
  "mountain", "river", "lake", "ocean", "beach", "desert", "forest", "field", "hill", "valley",
  "city", "town", "village", "street", "building", "house", "apartment", "road", "bridge", "park",
  "school", "library", "museum", "restaurant", "shop", "store", "market", "mall", "bank",
  "doctor", "nurse", "teacher", "student", "engineer", "scientist", "artist", "actor", "musician", "writer",
  "coffee", "tea", "water", "juice", "milk", "wine", "beer", "soda", "cocktail", "smoothie",
  "pizza", "burger", "pasta", "sushi", "salad", "sandwich", "steak", "chicken", "fish", "dessert",
  "chocolate", "cake", "cookie", "pie", "candy", "popcorn", "chips", "pretzel", "nuts",
  "health", "fitness", "exercise", "diet", "nutrition", "yoga", "meditation", "running", "swimming", "cycling",
  "vacation", "holiday", "adventure", "journey", "trip", "exploration", "travel", "destination", "tour", "resort",
  "mountain", "island", "beach", "desert", "forest", "wilderness", "path", "trail", "camping", "hiking",
  "sports", "soccer", "basketball", "tennis", "volleyball", "baseball", "cricket", "rugby", "golf",
  "exercise", "gym", "workout", "strength", "stretching", "endurance", "flexibility", "teamwork", "competition", "coach",
  "event", "match", "tournament", "medal", "winner", "team", "referee", "score", "goal", "champion",
  "mountain", "river", "lake", "ocean", "field", "tree", "forest", "cliff", "cave", "canyon"
];

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
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = [];
  correctGuesses = [];
  remainingGuesses = 6;
  isGameOver = false;

  updateWordDisplay();
  document.getElementById("gallows-image").src = "images/Gallows0.png";
  updateRemainingGuesses();
  document.getElementById("guessed-letters").textContent = "Guessed Letters (Incorrect): ";
  document.getElementById("guess-input").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").focus();
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
});
