"use strict";
const input = document.querySelector('#attempt-input');
const guess = document.querySelector('#guess-button');
const reset = document.querySelector('#reset-button');
const feedBackContainer = document.querySelector('.card__feedback');
const feedbackText = document.querySelector('#feedback-text');
const cardForm = document.querySelector('.card__form');
const progressBar = document.querySelector('#progress-bar');
const attemptText = document.querySelectorAll('.card__attempt');
const generateRandomNumber = () => Math.floor(Math.random() * (101 - 1) + 1);
let randomNumber = generateRandomNumber();
let attempts = 0;
const MAX_ATTEMPTS = 10;
const handleInput = (e) => {
    const target = e.target;
    guess.disabled = target.value === "";
};
const setFeedback = (text, type) => {
    feedBackContainer.classList.remove("card__feedback--high", "card__feedback--low", "card__feedback--win");
    if (type) {
        feedBackContainer.classList.add(`card__feedback--${type}`);
    }
    feedbackText.textContent = text;
};
const handleGuess = () => {
    const guessValue = parseInt(input.value);
    if (guessValue < 1 || guessValue > 100) {
        setFeedback("Please enter a valid number between 1 and 100");
        return;
    }
    attempts += 1;
    progressBar.style.width = `${attempts}0%`;
    attemptText.forEach(text => text.textContent = `${attempts}`);
    if (attempts === MAX_ATTEMPTS && guessValue !== randomNumber) {
        setFeedback(`😔 Game over! The number was ${randomNumber}. Better luck next time!`);
        progressBar.classList.add("card__progress_bar--lose");
        cardForm.style.display = "none";
        input.value = "";
        guess.disabled = true;
        return;
    }
    if (guessValue < randomNumber) {
        setFeedback(`Too low! Try a higher number. ${MAX_ATTEMPTS - attempts} attempts remaining.`, "high");
    }
    else if (guessValue > randomNumber) {
        setFeedback(`Too high! Try a lower number. ${MAX_ATTEMPTS - attempts} attempts remaining.`, "low");
    }
    else {
        setFeedback(`🎉 ${input.value} Congratulations! You guessed it in ${attempts} attempts!`, "win");
        progressBar.classList.add("card__progress_bar--win");
        cardForm.style.display = "none";
    }
    input.value = "";
    guess.disabled = true;
};
const handleEnter = (e) => {
    if (e.key === "Enter" && !guess.disabled) {
        handleGuess();
    }
};
const handleReset = () => {
    randomNumber = generateRandomNumber();
    attempts = 0;
    attemptText.forEach(text => text.textContent = `${attempts}`);
    progressBar.style.width = `0%`;
    cardForm.style.display = "flex";
    progressBar.classList.remove("card__progress_bar--win");
    progressBar.classList.remove("card__progress_bar--lose");
    feedBackContainer.classList.remove("card__feedback--win");
    feedbackText.textContent = `I'm thinking of a number between 1 and 100. Can you guess it?`;
};
input.addEventListener("input", handleInput);
input.addEventListener("keyup", handleEnter);
guess.addEventListener("click", handleGuess);
reset.addEventListener("click", handleReset);
