let wrongGuesses = 0;
const maxWrongGuesses = 6; // Total parts (head, body, arms, legs)

const bodyParts = [
    document.getElementById('head'),
    document.getElementById('body'),
    document.getElementById('left-arm'),
    document.getElementById('right-arm'),
    document.getElementById('left-leg'),
    document.getElementById('right-leg')
];

function makeWrongGuess() {
    if (wrongGuesses < maxWrongGuesses) {
        bodyParts[wrongGuesses].src = `images/${bodyPartImages[wrongGuesses]}`; // Change image path for each body part
        bodyParts[wrongGuesses].style.display = 'block';
        wrongGuesses++;
    }
}

// Sample bodyPartImages array that corresponds to the body part images
const bodyPartImages = [
    'head.png', 
    'body.png', 
    'left-arm.png', 
    'right-arm.png', 
    'left-leg.png', 
    'right-leg.png'
];

// Example function to simulate wrong guesses
function handleGuess(letter) {
    if (!correctGuess(letter)) { // If the guess is wrong
        makeWrongGuess();
    }
}

function correctGuess(letter) {
    // Check if the guess is correct and return true or false
    return false;  // For testing, you can set it to always return false (simulate wrong guesses)
}
