console.log("Welcome to Tic Tac Toe");

let turn = "X";
let isGameOver = false;
let score = { X: 0, O: 0 };
let mode = "two"; // "two" or "ai"
let difficulty = "easy";
let soundOn = true;

const music = new Audio("music.mp3");
const audioTurn = new Audio("ting.mp3");
const gameOverSound = new Audio("gameover.mp3");

const infoText = document.querySelector(".info");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const imgCelebrate = document.querySelector(".imgbox img");
const line = document.querySelector(".line");

// Load scores from localStorage
const loadScores = () => {
  let savedScore = JSON.parse(localStorage.getItem("ticTacToeScore"));
  if (savedScore) {
    score = savedScore;
    updateScoreDisplay();
  }
};

const saveScores = () => {
  localStorage.setItem("ticTacToeScore", JSON.stringify(score));
};

const updateScoreDisplay = () => {
  scoreXEl.innerText = score["X"];
  scoreOEl.innerText = score["O"];
};

const changeTurn = () => (turn === "X" ? "O" : "X");

const playSound = (audio) => {
  if (soundOn) {
    audio.currentTime = 0;
    audio.play();
  }
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  for (const e of wins) {
    if (
      boxtext[e[0]].innerText &&
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText === boxtext[e[2]].innerText
    ) {
      infoText.innerText = boxtext[e[0]].innerText + " Won";
      isGameOver = true;
      imgCelebrate.style.width = "200px";
      line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      line.style.width = "20vw";
      updateScore(boxtext[e[0]].innerText);
      playSound(gameOverSound);
      return true;
    }
  }
  // Check draw
  if ([...boxtext].every((box) => box.innerText !== "")) {
    infoText.innerText = "Draw!";
    isGameOver = true;
    playSound(gameOverSound);
    return true;
  }
  return false;
};

const updateScore = (winner) => {
  score[winner]++;
  updateScoreDisplay();
  saveScores();
};

const fillBox = (index, value) => {
  let boxes = document.getElementsByClassName("box");
  let boxtext = boxes[index].querySelector(".boxtext");
  if (boxtext.innerText === "") {
    boxtext.innerText = value;
    boxtext.classList.add("filled");
    return true;
  }
  return false;
};

const resetGame = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  for (const box of boxtext) {
    box.innerText = "";
    box.classList.remove("filled");
  }
  isGameOver = false;
  turn = "X";
  infoText.innerText = "Turn for " + turn;
  imgCelebrate.style.width = "0";
  line.style.width = "0";
};

const aiMove = () => {
  if (isGameOver) return;

  let boxes = document.getElementsByClassName("box");
  let boxtext = document.getElementsByClassName("boxtext");

  // Easy mode: random empty box
  if (difficulty === "easy") {
    let emptyIndices = [];
    for (let i = 0; i < boxtext.length; i++) {
      if (boxtext[i].innerText === "") emptyIndices.push(i);
    }
    if (emptyIndices.length > 0) {
      let choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      fillBox(choice, turn);
      playSound(audioTurn);
      if (!checkWin()) {
        turn = changeTurn();
        infoText.innerText = "Turn for " + turn;
      }
    }
  } else {
    // Hard mode: minimax AI
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < boxtext.length; i++) {
      if (boxtext[i].innerText === "") {
        boxtext[i].innerText = turn;
        let score = minimax(boxtext, 0, false);
        boxtext[i].innerText = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    if (move !== null) {
      fillBox(move, turn);
      playSound(audioTurn);
      if (!checkWin()) {
        turn = changeTurn();
        infoText.innerText = "Turn for " + turn;
      }
    }
  }
};

const minimax = (board, depth, isMaximizing) => {
  let result = evaluate(board);
  if (result !== null) return result;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = turn;
        let score = minimax(board, depth + 1, false);
        board[i].innerText = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    let opponent = turn === "X" ? "O" : "X";
    for (let i = 0; i < board.length; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = opponent;
        let score = minimax(board, depth + 1, true);
        board[i].innerText = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const evaluate = (board) => {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of wins) {
    if (
      board[a].innerText &&
      board[a].innerText === board[b].innerText &&
      board[a].innerText === board[c].innerText
    ) {
      if (board[a].innerText === turn) return 10;
      else return -10;
    }
  }
  // Check draw
  if ([...board].every((box) => box.innerText !== "")) return 0;

  return null;
};

window.onload = () => {
  loadScores();
  updateScoreDisplay();
  infoText.innerText = "Turn for " + turn;

  // Setup event listeners
  const boxes = document.getElementsByClassName("box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
      if (isGameOver) return;
      let boxtext = boxes[i].querySelector(".boxtext");
      if (boxtext.innerText === "") {
        fillBox(i, turn);
        playSound(audioTurn);
        if (!checkWin()) {
          turn = changeTurn();
          infoText.innerText = "Turn for " + turn;
          if (mode === "ai" && turn === "O") {
            setTimeout(aiMove, 500);
          }
        }
      }
    });
  }

  document.getElementById("reset").addEventListener("click", () => {
    resetGame();
  });

  document.getElementById("darkToggle").addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });

  document.getElementById("modeSelector").addEventListener("change", (e) => {
    mode = e.target.value;
    resetGame();
  });

  document.getElementById("difficulty").addEventListener("change", (e) => {
    difficulty = e.target.value;
  });

  document.getElementById("soundToggle").addEventListener("change", (e) => {
    soundOn = e.target.checked;
  });

  document.getElementById("colorPicker").addEventListener("input", (e) => {
    document.body.style.setProperty("--theme-color", e.target.value);
    line.style.backgroundColor = e.target.value;
  });
};
