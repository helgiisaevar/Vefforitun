//const foo = require("./utils/fetchMinesweeperBoardFromServer");

console.log("Main running: ");

fetchMinesweeperBoardFromServer(5, 5, 3);

for (let x = 0; x < 4; x++) {
  const row = createRow(x, 4);
  document.getElementById("minesweeper_board").appendChild(row);
}

// generateBoard()
