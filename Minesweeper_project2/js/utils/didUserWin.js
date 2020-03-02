function didUserWin() {
  // Have all boxes been opened
  let haveAllBoxesBeenOpen = true

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      const boxDiv = document.getElementById(i + ';' + j)

      if (
        !boxDiv.classList.contains('opened-box') &&
        !boxDiv.classList.contains('boxWithoutBomb') &&
        !boxDiv.classList.contains('flag')
      ) {
        haveAllBoxesBeenOpen = false
      }
    }
  }

  let allMinesFlagged = true

  // Have all bombs been marked as flags
  for (let i = 0; i < MINES.length; i++) {
    const mineRow = MINES[i][0]
    const mineColumn = MINES[i][1]

    if (
      !document
        .getElementById(mineRow + ';' + mineColumn)
        .classList.contains('flag')
    ) {
      allMinesFlagged = false
    }
  }

  if (haveAllBoxesBeenOpen && allMinesFlagged) {
    return true
  }

  return false
}
