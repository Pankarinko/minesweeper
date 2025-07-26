console.log('This is my TypeScript Minesweeper');

var fields: { clicked: boolean, open: boolean, val: number }[][] = [];
var mines: number = 6;
var size: number = 10;

const board: any =
    document.getElementById(
        "board"
    );

function board_init() {
    for (let i: number = 0; i < size; i++) {
        fields[i] = [];
        for (let j: number = 0; j < size; j++) {
            fields[i][j] = { clicked: false, open: false, val: 0 };
        }
    }

    const mine = new Set();

    while (mine.size < mines) {
        const randomNumx = Math.floor(Math.random() * (mines + 1));
        const randomNumy = Math.floor(Math.random() * (mines + 1));
        const elem: { x: number, y: number } = { x: randomNumx, y: randomNumy };
        if (mine.has(elem) == false) {
            mine.add(elem);
        }

        let pos: any = Array.from(mine);

        for (let i: number = 0; i < pos.length; i++) {
            fields[pos[i].x][pos[i].y] = { clicked: false, open: false, val: -1 };
        }
    }
}



function mark(x: number, y: number) {
    if (fields[x][y].clicked === false) { fields[x][y].clicked = true; }
    else {
        fields[x][y].clicked = false;
    }
    renderBoard();
}

function open_cell(x: number, y: number) {
    if (fields[x][y].open === false) { fields[x][y].open = true; }
    renderBoard();
}


function renderBoard() {
    board.innerHTML = "";
    for (let i: number = 0; i < size; i++) {
        for (let j: number = 0; j < size; j++) {
            const cell =
                document.createElement(
                    "div"
                );
            if (fields[i][j].open === true) {
                cell.className = "open";
                cell.textContent = "";
            } else {
                cell.className = "cell";
                cell.textContent = "";
                if (fields[i][j].clicked === true) {
                    cell.textContent = "󰚑";
                }

                cell.addEventListener(
                    "click",
                    () => mark(i, j)
                );

            }
            cell.addEventListener("contextmenu", function (ev) { ev.preventDefault(); open_cell(i, j); false });
            board.appendChild(cell);

        }
        board.appendChild(
            document.createElement("br")
        );
    }
}


board_init();
renderBoard();



