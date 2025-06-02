# Tic Tac Toe - Enhanced Version

A modern, interactive Tic Tac Toe game built with HTML, CSS, and JavaScript featuring:

- Two-player and single-player mode with AI opponent (easy and hard difficulty)
- Dark mode toggle for comfortable night-time play
- Sound effects with toggle on/off option
- Score tracking with persistent storage (using `localStorage`)
- Theme color picker to customize the game’s accent color
- Animated transitions for smooth gameplay experience
- Responsive design that adapts to different screen sizes

---

## Demo

*Add your demo URL here if hosted*

---

## Features

- **Two Player Mode**: Play against a friend locally on the same device.
- **Single Player Mode (AI)**: Play against the computer. Choose between easy (random moves) or hard (minimax algorithm) difficulty.
- **Dark Mode**: Toggle dark/light theme for visual comfort.
- **Sound Effects**: Audio feedback for moves and game over, with an option to mute/unmute.
- **Score Tracker**: Scores for players X and O are tracked and saved between sessions.
- **Custom Theme Color**: Pick a custom accent color for the game highlights and winning line.
- **Responsive Design**: The game works smoothly on desktops, tablets, and mobile devices.

---

## How to Use

1. Open `index.html` in your browser.
2. Use the controls in the navigation bar to:
   - Switch between two-player and AI mode.
   - Select AI difficulty (only active in AI mode).
   - Toggle dark mode.
   - Toggle sound effects.
   - Pick a theme color.
3. Click on any empty square to make your move.
4. Click **Reset** to restart the game at any time.
5. Scores will be saved automatically in your browser.

---

## Technologies Used

- HTML5 & CSS3 (with Google Fonts)
- JavaScript (ES6+)
- Local Storage API for persistent scores
- Basic minimax algorithm for AI

---

## AI Algorithm

- Easy: AI picks a random available spot.
- Hard: AI uses the Minimax algorithm for unbeatable gameplay.

---

## Project Structure

/tic-tac-toe
├── index.html # Main HTML file
├── style.css # Styles and themes
├── script.js # Game logic and AI
├── music.mp3 # Background music (optional)
├── ting.mp3 # Turn sound effect (optional)
├── gameover.mp3 # Game over sound effect (optional)
└── README.md # This documentation file


## License

This project is open-source and free to use. Feel free to customize and expand as you like!

## Contact

For questions or feedback, reach out to me at: *vanshsahu35@gmail.com*
