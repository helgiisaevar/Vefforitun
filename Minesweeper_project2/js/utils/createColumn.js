function createColumn(columnNumber, numberOfBoxes) {
  const column = document.createElement('div')
  column.className = 'rowOfBoxes'

  for (let rowNumber = 0; rowNumber < numberOfBoxes; rowNumber++) {
    const box = document.createElement('div')
    box.className = 'box'
    box.id = rowNumber + ';' + columnNumber
    box.addEventListener('click', boxClicked)
    column.appendChild(box)
  }

  return column
}
