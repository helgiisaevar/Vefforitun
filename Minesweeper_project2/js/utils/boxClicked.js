const boxClicked = event => {
  const clickedBox = event.target
  const clickedRow = Number(clickedBox.id.split(';')[0])
  const clickedColumn = Number(clickedBox.id.split(';')[1])

  if (isLocationABomb(clickedRow, clickedColumn)) {
    // BOOM you ae deade
    clickedBox.classList.add('red')
    return
  }

  areNeighborsBombs(clickedRow, clickedColumn)
}

const allPossibleNeighbors = (row, column) => {
  return [
    // Above neighbor
    {
      row: row - 1,
      column
    },
    // Above right diagonal
    {
      row: row - 1,
      column: column + 1
    },
    // Right sibling
    {
      row,
      column: column + 1
    },
    // Bottom right diagonal
    {
      row: row + 1,
      column: column + 1
    },
    // Bottom neighbor
    {
      row: row + 1,
      column
    },
    // Bottom left diagonal
    {
      row: row + 1,
      column: column - 1
    },
    // Left sibling
    {
      row,
      column: column - 1
    },
    // Top left diagonal
    {
      row: row - 1,
      column: column - 1
    }
  ]
}

// location is
function areNeighborsBombs(row, column) {
  let bombCounter = 0
  const neighbors = allPossibleNeighbors(row, column)

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

  document.getElementById(row + ';' + column).classList.add(counterColor)

  // If we had bombs no recursion
  if (bombCounter > 0) {
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
    areNeighborsBombs(neighborRow, neighborColumn)
  }
}

function isLocationABomb(row, column) {
  for (let i = 0; i < mines.length; i++) {
    const mineRow = mines[i][0]
    const mineColumn = mines[i][1]

    if (mineRow === row && mineColumn === column) {
      return true
    }
  }
  return false
}
