"use strict";
console.log('This is my TypeScript Minesweeper');
var fields = [];
var mines = 10;
var size = 10;
const board = document.getElementById("board");
function board_init() {
    for (let i = 0; i < size; i++) {
        fields[i] = [];
        for (let j = 0; j < size; j++) {
            fields[i][j] = { clicked: false, open: false, val: 0 };
        }
    }
    const mine = new Set();
    while (mine.size < mines) {
        const randomNumx = Math.floor(Math.random() * (size));
        const randomNumy = Math.floor(Math.random() * (size));
        const elem = { x: randomNumx, y: randomNumy };
        if (mine.has(elem) == false) {
            mine.add(elem);
        }
        let pos = Array.from(mine);
        for (let i = 0; i < pos.length; i++) {
            fields[pos[i].x][pos[i].y] = { clicked: false, open: false, val: -1 };
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            set_numbers(i, j);
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
function open_cell(x, y) {
    fields[x][y].open = true;
    if (fields[x][y].val === 0) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
                    //if (fields[x + i][y + j].val === 0) {
                    //    open_cell(x + i, y + j);
                    //}
                    fields[x + i][y + j].open = true;
                }
            }
        }
    }
    renderBoard();
}
function set_numbers(x, y) {
    if (fields[x][y].val === -1) {
        return;
    }
    let mines = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
                if (fields[x + i][y + j].val === -1) {
                    mines++;
                }
            }
        }
    }
    fields[x][y].val = mines;
}
function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            if (fields[i][j].open === true) {
                cell.className = "open";
                if (fields[i][j].val !== 0) {
                    cell.textContent = String(fields[i][j].val);
                }
                if (fields[i][j].val === -1) {
                    cell.textContent = "󰚑";
                    cell.className = "mine";
                }
            }
            else {
                cell.className = "cell";
                cell.textContent = "";
                if (fields[i][j].clicked === true) {
                    cell.textContent = "󰚑";
                }
                cell.addEventListener("click", () => mark(i, j));
                cell.addEventListener("contextmenu", function (ev) { ev.preventDefault(); open_cell(i, j); false; });
            }
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}
board_init();
renderBoard();
