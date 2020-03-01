console.log('Main running: ')

fetchMinesweeperBoardFromServer(5, 5, 3)

const columns = 4
const rows = 4

for (let x = 0; x < columns; x++) {
  const row = createColumn(x, rows)
  document.getElementById('minesweeper_board').appendChild(row)
}
