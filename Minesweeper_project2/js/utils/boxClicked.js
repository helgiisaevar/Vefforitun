const boxClicked = event => {
  const clickedBox = event.target
  const clickedRow = Number(clickedBox.id.split(';')[0])
  const clickedColumn = Number(clickedBox.id.split(';')[1])

  const hasFlags = clickedBox.classList.contains('flag')

  if (hasFlags) {
    return
  }

  clickedBox.classList.add('opened-box')

  if (isLocationABomb(clickedRow, clickedColumn)) {
    // Disable board
    document.getElementById('minesweeper_board').classList.add('disabled')

    // Show all bombs
    revealAllBombs()

    // Disable game over
    document.getElementById('loser-title').innerHTML = 'YOU HAVE LOST ! :('

    return
  }

  areNeighborsBombs(clickedRow, clickedColumn)

  if (didUserWin()) {
    console.log(
      'USER HAS WON !!! I SHOULD REALLY DO SOMETHING IN THE HTML HERE TO SHOW THAT '
    )
    document.getElementById('winning-title').innerHTML = 'YOU WON!'
  }
}

function allPossibleNeighbors(row, column) {
  var retList = []
  //var dest = {row: row, column: column}
  if (column + 1 < COLUMNS) {
    retList.push({ row: row, column: column + 1 })
    if (row + 1 < ROWS) {
      retList.push({ row: row + 1, column: column + 1 })
    }
    if (row - 1 >= 0) {
      retList.push({ row: row - 1, column: column + 1 })
    }
  }

  if (row + 1 < ROWS) {
    retList.push({ row: row + 1, column: column })
  }

  if (row - 1 >= 0) {
    retList.push({ row: row - 1, column: column })
  }

  if (column - 1 >= 0) {
    retList.push({ row: row, column: column - 1 })
    if (row + 1 < ROWS) {
      retList.push({ row: row + 1, column: column - 1 })
    }

    if (row - 1 >= 0) {
      retList.push({ row: row - 1, column: column - 1 })
    }
  }
  return retList
}

function revealAllBombs() {
  for (let i = 0; i < MINES.length; i++) {
    const mineRow = MINES[i][0]
    const mineColumn = MINES[i][1]
    document.getElementById(mineRow + ';' + mineColumn).className =
      'box opened-box bomb'
  }
}

function areNeighborsBombs(row, column) {
  let bombCounter = 0
  var neighbors = allPossibleNeighbors(row, column)

  for (let idx = 0; idx < neighbors.length; idx++) {
    const neighborRow = neighbors[idx].row
    const neighborColumn = neighbors[idx].column

    if (isLocationABomb(neighborRow, neighborColumn)) {
      bombCounter++
    }
  }

  let counterColor = 'box--red'

  if (bombCounter === 1) {
    counterColor = 'box--blue'
  }

  if (bombCounter === 2) {
    counterColor = 'box--green'
  }

  // If we had bombs no recursion and we open
  if (bombCounter > 0) {
    document.getElementById(row + ';' + column).classList.add(counterColor)
    document.getElementById(row + ';' + column).classList.add('opened-box')
    document.getElementById(row + ';' + column).innerHTML = bombCounter
    return
  }

  // Here no neighbor bombs were found,
  // We "open" current box as box without bombs and
  // we check on the other neighbors
  document.getElementById(row + ';' + column).classList.add('boxWithoutBomb')

  for (let idx = 0; idx < neighbors.length; idx++) {
    const neighborRow = neighbors[idx].row
    const neighborColumn = neighbors[idx].column

    const neighborElement = document.getElementById(
      neighborRow + ';' + neighborColumn
    )
    const hasBeenVisited =
      neighborElement && neighborElement.classList.contains('boxWithoutBomb')

    const hasFlags =
      neighborElement && neighborElement.classList.contains('flag')

    if (
      neighborRow < ROWS &&
      neighborRow >= 0 &&
      neighborColumn < COLUMNS &&
      neighborColumn >= 0 &&
      !hasBeenVisited &&
      !hasFlags
    ) {
      areNeighborsBombs(neighborRow, neighborColumn)
    }
  }
}

function isLocationABomb(row, column) {
  for (let i = 0; i < MINES.length; i++) {
    const mineRow = MINES[i][0]
    const mineColumn = MINES[i][1]

    if (mineRow === row && mineColumn === column) {
      return true
    }
  }
  return false
}
