

function generateBoard() {
    document.getElementById('minesweeper_board').innerHTML = ""
    document.getElementById('minesweeper_board').className = ""
    document.getElementById('loser-title').innerHTML = ""
    document.getElementById('winning-title').innerHTML = ""
    for (let x = 0; x < COLUMNS; x++) {
        const row = createColumn(x, ROWS)
        document.getElementById('minesweeper_board').appendChild(row)
      }
}

  
