var FLAG_INT = 0;

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
      .classList.remove('flag');
      FLAG_INT -=1;
    return
  }

  document
    .getElementById(clickedRow + ';' + clickedColumn)
    .classList.add('flag');
    FLAG_INT += 1;

  if (didUserWin()) {
    console.log(
      'USER HAS WON !!! I SHOULD REALLY DO SOMETHING IN THE HTML HERE TO SHOW THAT '
    )
    document.getElementById('winning-title').innerHTML = 'YOU WON!';
  }
}
