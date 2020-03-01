const boxRightClicked = () => {
  event.preventDefault()
  const clickedBox = event.target
  const clickedRow = Number(clickedBox.id.split(';')[0])
  const clickedColumn = Number(clickedBox.id.split(';')[1])

  const hasBeenClicked = clickedBox.classList.contains('opened-box')

  if (hasBeenClicked) {
    return
  }

  const hasFlags = clickedBox.classList.contains('flag')

  if (hasFlags) {
    document
      .getElementById(clickedRow + ';' + clickedColumn)
      .classList.remove('flag')
    return
  }

  document
    .getElementById(clickedRow + ';' + clickedColumn)
    .classList.add('flag')
}
