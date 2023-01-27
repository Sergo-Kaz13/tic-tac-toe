let nextPlayer = true;
let spoilerText = "x";

const board = document.querySelector(".board");
const spoiler = document.querySelector(".spoiler");

board.addEventListener("click", handleClick);

spoiler.textContent = spoilerText;

function handleClick(e) {
    if (e.target.localName === "td") {
        console.log(true);
        if (nextPlayer) {
            e.target.classList.add("tic");
        } else {
            e.target.classList.add("tac");
        }
    }

    nextPlayer = !nextPlayer;
    spoilerText = nextPlayer ? "x" : "o";
    spoiler.textContent = spoilerText;
}
