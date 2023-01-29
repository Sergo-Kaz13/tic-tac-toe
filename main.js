let nextPlayer = true;
let spoilerText = "x";
const boardText = [];

const userOneCount = document.querySelector(".user-one-count");
const userTwoCount = document.querySelector(".user-two-count");
const spoiler = document.querySelector(".spoiler");
const board = document.querySelector(".board");

board.addEventListener("click", handleClick);

spoiler.textContent = spoilerText;

function handleClick(e) {
    let item = e.target;
    if (item.localName === "td" && !item.textContent) {
        if (nextPlayer) {
            item.innerText = "X";
        } else {
            item.innerText = "O";
        }

        nextPlayer = !nextPlayer;
        spoilerText = nextPlayer ? "x" : "o";
        spoiler.textContent = spoilerText;

        getItemsBoard();
    }
}

function getItemsBoard() {
    const boardElement = document.getElementsByTagName("td");

    boardText.length = 0;

    for (const iterator of boardElement) {
        boardText.push(iterator.innerText);
    }

    getDataBoard();
}

function getDataBoard() {
    let row1 = "",
        row2 = "",
        row3 = "",
        col1 = "",
        col2 = "",
        col3 = "",
        diagonal1 = "",
        diagonal2 = "";

    for (let i = 0; i < boardText.length; i++) {
        if (i < 3) {
            row1 += boardText[i];
        } else if (i < 6) {
            row2 += boardText[i];
        } else if (i < boardText.length) {
            row3 += boardText[i];
        }

        if (i === 0 || i === 3 || i === 6) {
            col1 += boardText[i];
        }

        if (i === 1 || i === 4 || i === 7) {
            col2 += boardText[i];
        }

        if (i === 2 || i === 5 || i === 8) {
            col3 += boardText[i];
        }

        if (i === 0 || i === 4 || i === 8) {
            diagonal1 += boardText[i];
        }

        if (i === 2 || i === 4 || i === 6) {
            diagonal2 += boardText[i];
        }
    }

    const structuredDataBoard = [
        row1,
        row2,
        row3,
        col1,
        col2,
        col3,
        diagonal1,
        diagonal2,
    ];

    determineTheWinner(structuredDataBoard);
}

function determineTheWinner(boardData) {
    boardData.forEach((item) => {
        if (item === "XXX") {
            showWinner(document.querySelector(".user-one").value);
            showUserCount("x");
        } else if (item === "OOO") {
            showWinner(document.querySelector(".user-two").value);
            showUserCount("o");
        }
    });
}

function showWinner(winner) {
    console.log(["winner"], winner);

    const winnerByLetters = winner.split("");

    const wrapper = document.querySelector(".wrapper");
    const canvasWinner = document.createElement("div");
    const titleWinner = document.createElement("h1");
    const btnRestart = document.createElement("button");

    canvasWinner.classList = "canvas-winner";
    titleWinner.classList = "title-winner";
    btnRestart.classList = "btn-restart";

    btnRestart.addEventListener("click", restartGame);

    titleWinner.innerHTML = `winner: `;
    btnRestart.innerText = "try again";

    winnerByLetters.forEach((letter) => {
        titleWinner.innerHTML += `<span>${letter}</span>`;
    });

    canvasWinner.append(titleWinner);
    canvasWinner.append(btnRestart);
    wrapper.append(canvasWinner);
}

function restartGame() {
    for (const item of document.querySelectorAll("td")) {
        item.innerHTML = "";
    }
    document.querySelector(".canvas-winner").remove();
}

function showUserCount(user) {
    if (user === "x") {
        userOneCount.textContent++;
    } else if (user === "o") {
        userTwoCount.textContent++;
    }
}
