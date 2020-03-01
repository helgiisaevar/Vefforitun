

function generateBoard() {
    for (let x = 0; x < COLUMNS; x++) {
        const row = createColumn(x, ROWS)
        document.getElementById('minesweeper_board').appendChild(row)
      }
}

  
