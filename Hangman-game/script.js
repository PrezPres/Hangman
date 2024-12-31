const wordToGuess = "JAVASCRIPT";
const maxLives = 6;
let lives = maxLives;
let guessedWord = "_".repeat(wordToGuess.length).split("");
let wrongGuesses = [];

const wordElement = document.getElementById("word");
const guessInput = document.getElementById("guess");
const wrongGuessesElement = document.getElementById("wrong-guesses");
const livesElement = document.getElementById("lives");
const resetButton = document.getElementById("reset");

function updateDisplay() {
    wordElement.textContent = guessedWord.join(" ");
    wrongGuessesElement.textContent = `Wrong guesses: ${wrongGuesses.join(", ")}`;
    livesElement.textContent = `Lives: ${lives}`;
}

document.getElementById("submit").addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = "";

    if (!guess || guess.length !== 1 || guessedWord.includes(guess) || wrongGuesses.includes(guess)) {
        alert("Invalid or repeated guess!");
        return;
    }

    if (wordToGuess.includes(guess)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        wrongGuesses.push(guess);
        lives--;
    }

    updateDisplay();

    if (guessedWord.join("") === wordToGuess) {
        alert("You won!");
    } else if (lives === 0) {
        alert(`Game over! The word was ${wordToGuess}`);
    }
});

resetButton.addEventListener("click", () => {
    lives = maxLives;
    guessedWord = "_".repeat(wordToGuess.length).split("");
    wrongGuesses = [];
    updateDisplay();
});

// Initialize game display
updateDisplay();
