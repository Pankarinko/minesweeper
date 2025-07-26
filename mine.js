"use strict";
console.log('This is my TypeScript Minesweeper');
var fields = [];
var mines = 6;
var size = 10;
const board = document.getElementById("board");
function board_init() {
    for (let i = 0; i < size; i++) {
        fields[i] = [];
        for (let j = 0; j < size; j++) {
            fields[i][j] = { clicked: false, val: 0 };
        }
    }
    const mine = new Set();
    while (mine.size < mines) {
        const randomNumx = Math.floor(Math.random() * (mines + 1));
        const randomNumy = Math.floor(Math.random() * (mines + 1));
        const elem = { x: randomNumx, y: randomNumy };
        if (mine.has(elem) == false) {
            mine.add(elem);
        }
        let pos = Array.from(mine);
        for (let i = 0; i < pos.length; i++) {
            fields[pos[i].x][pos[i].y] = { clicked: false, val: -1 };
        }
    }
}
function mark(x, y) {
    if (fields[x][y].clicked === false) {
        fields[x][y].clicked = true;
    }
    else {
        fields[x][y].clicked = false;
    }
    renderBoard();
}
function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            if (fields[i][j].val < 0) {
                cell.className = "open";
            }
            else {
                cell.className = "cell";
                cell.textContent = "";
                if (fields[i][j].clicked === true) {
                    cell.textContent = "󰚑";
                }
                cell.addEventListener("click", () => mark(i, j));
            }
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}
board_init();
renderBoard();
