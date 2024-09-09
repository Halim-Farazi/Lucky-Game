(function () {
  //Selecting HTML elements
  const formElm = document.querySelector("form");
  const inputElm = document.querySelector("#luck-input");
  const winScoreElm = document.querySelector(".lucky-number span");
  const winPlayerElm = document.querySelector(".winner");
  const p1BtnElm = document.querySelector(".p1Btn");
  const p2BtnElm = document.querySelector(".p2Btn");
  const p1ScoreElm = document.querySelector(".p1");
  const p2ScoreElm = document.querySelector(".p2");
  const resetBtnElm = document.querySelector("#resetBtn");

  //data store
  let p1Score = 0;
  let p2Score = 0;
  let gameOver = false;
  let p1Turn = true;
  let p2Turn = false;

  //Set initial winning score  a random value rather than default value
  const minScore = 10;
  const maxScore = 30;
  let winningScore =
    Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;

  function setIntialPlayer() {
    const player = randomPlayerSelection();
    if (player === "p1") {
      p1Turn = true;
      p2BtnElm.setAttribute("disabled", "disabled");
      p1BtnElm.removeAttribute("disable");
    } else {
      p2Turn = true;
      p1BtnElm.setAttribute("disabled", "disabled");
      p2BtnElm.removeAttribute("disable");
    }
  }

  setIntialPlayer();

  function randomPlayerSelection() {
    const players = ["p1", "p2"];
    const index = Math.floor(Math.random() * players.length);
    const player = players[index];
    return player;
  }
  function identifyWinningState(p1Score, p2Score, winningScore) {
    if (p1Score === winningScore || p2Score === winningScore) {
      gameOver = true;
    }
  }

  function identfyWinner() {
    if (p1Score === winningScore) {
      winner = "p1";
      winPlayerElm.textContent = "Player 1 is Winner";
    }
    if (p2Score === winningScore) {
      winner = "p2";
      winPlayerElm.textContent = "Player 2 is Winner";
    }
  }

  function disableBtnInput() {
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  }

  function resetInput() {
    p1Score = 0;
    p2Score = 0;
    winningScore = 5;
    gameOver = false;
    winner = null;

    p1ScoreElm.textContent = p1Score;
    p2ScoreElm.textContent = p2Score;
    winPlayerElm.textContent = "";
    p1BtnElm.removeAttribute("disabled");
    p2BtnElm.removeAttribute("disabled");
  }

  function validateValue(val) {
    if (val.trim == "" || Number(val) !== Number(val) || val <= 0) {
      alert("input a valid number");
      return false;
    } else {
      return true;
    }
  }
  //seeting winnering score
  winScoreElm.textContent = winningScore;

  p1BtnElm.addEventListener("click", (evt) => {
    if (p1Turn) {
      p1Score++;
      identifyWinningState(p1Score, p2Score, winningScore);
      identfyWinner();
      p1ScoreElm.textContent = p1Score;
      p1Turn = false;
      p2Turn = true;
      p1BtnElm.setAttribute("disabled", "disabled");
      p2BtnElm.removeAttribute("disabled");
    }
    if (gameOver) {
      disableBtnInput();
    }
  });

  p2BtnElm.addEventListener("click", (evt) => {
    if (p2Turn) {
      p2Score++;
      identifyWinningState(p1Score, p2Score, winningScore);
      identfyWinner();
      p2ScoreElm.textContent = p2Score;
      p2Turn = false;
      p1Turn = true;
      p2BtnElm.setAttribute("disabled", "disabled");
      p1BtnElm.removeAttribute("disabled");
    }
    if (gameOver) {
      disableBtnInput();
    }
  });

  resetBtnElm.addEventListener("click", (evt) => {
    resetInput();
  });

  formElm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    resetInput();
    if (!validateValue(inputElm.value)) return;
    const val = inputElm.value;
    winningScore = val;
    winScoreElm.textContent = val;
    inputElm.value = "";
    setIntialPlayer();
  });
})();
