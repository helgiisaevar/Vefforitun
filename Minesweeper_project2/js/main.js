console.log('Main running: ')

fetchMinesweeperBoardFromServer(5, 5, 3)

const COLUMNS = 4
const ROWS = 4

for (let x = 0; x < COLUMNS; x++) {
  const row = createColumn(x, ROWS)
  document.getElementById('minesweeper_board').appendChild(row)
}
