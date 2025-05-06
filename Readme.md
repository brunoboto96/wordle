# Wordle Game
## Overview

This is a **Wordle clone built with React**. The game challenges players to guess a five-letter word within a maximum of five tries. After each guess, the game provides feedback by highlighting letters:

- 🟩 **Green (Correct)**: The letter is in the correct position.
- 🟧 **Orange (Misplaced)**: The letter is in the word but in the wrong position.
- ⬜ **Default**: The letter is not in the word.

## Gameplay Instructions

1. **Type your guess**: Use your keyboard to type a five-letter word.
2. **Get feedback**: After entering a complete word, each letter will be marked as correct, misplaced, or incorrect.
3. **Win or retry**: Successfully guess the word within five tries to win. If you fail, the game will reveal the word and allow you to restart.

## Features

- **Random Word Selection**: A new word is randomly selected from an external API on each page load.
- **Hints**: Optionally reveal the first three letters of the answer to assist your guess.
- **Restart Option**: Easily start a new game with the click of a button.
- **Visual Feedback**: Real-time highlighting of correct/misplaced letters.

## Technical Details

- **Built with**: React (Functional Components, Hooks)
- **API Source**: [Frontend Expert Wordle Words API](https://frontendexpert.io)
- **Keyboard Interaction**: Listens to physical keyboard input for seamless play.

## Running the Project

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```
3.	Start the development server:

   ```bash
   npm run dev
   ```

## Notes
- The game uses a CORS proxy to fetch the word list from the API.
- The app reloads the page to reset the game state when starting over.