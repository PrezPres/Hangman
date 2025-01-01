export class Hangman {
  constructor(word, maxGuesses) {
    this.word = word.toLowerCase();
    this.maxGuesses = maxGuesses;
    this.guessedLetters = [];
    this.remainingGuesses = maxGuesses;
    this.hints = {
      hangman: "A classic word-guessing game.",
      javascript: "A popular programming language.",
      programming: "The process of creating software.",
      web: "A connected system of networks.",
      game: "An activity for entertainment."
    };
  }

  guess(letter) {
    if (!letter.match(/^[a-z]$/)) {
      return { success: false, message: "Please enter a single alphabet letter." };
    }
    if (this.guessedLetters.includes(letter)) {
      return { success: false, message: "You already guessed that letter!" };
    }

    this.guessedLetters.push(letter);

    if (this.word.includes(letter)) {
      return { success: true, correct: true };
    } else {
      this.remainingGuesses--;
      return { success: true, correct: false };
    }
  }

  isGameOver() {
    return this.remainingGuesses <= 0 || !this.getDisplayedWord().includes("_");
  }

  getDisplayedWord() {
    return this.word.split("").map(letter => 
      this.guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
  }

  getHint() {
    return this.hints[this.word] || "No hint available.";
  }
}
