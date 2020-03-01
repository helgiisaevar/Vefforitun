// var img = "<img id='bomb' src='./asstes/bomb.png' alt='img of bomb'>";
// console.log('IMage:')
// var img = document.getElementById('bomb')
// console.log(img.alt);


const mines = [
  [3, 2],
  [1, 3],
  [0, 1]
];

// img.src = './utils/assets/flag.png'
// img.onload = function() {
//     div.appendChild(img);
// };


const boxClicked = event => {
  const clickedBox = event.target.id;
  const eventRow = Number(clickedBox.split(";")[0]);
  const eventColumn = Number(clickedBox.split(";")[1]);
  

  console.log(eventRow);
  console.log(eventColumn);

  mines.forEach(v => {
    const mineRow = v[0];
    const mineColumn = v[1];
    console.log('NumberS: ')
    console.log(mineRow)
    console.log(mineColumn)
    let counter = 0
    console.log(counter)
    if (mineRow === eventRow && mineColumn === eventColumn) {
      const bombDiv = document
        .getElementById(eventRow + ";" + eventColumn)
        .classList.add("red");
        //.classList.add(bombImage)
        var img = document.getElementById('bomb')
        counter +=1
        console.log('COUNTER status:');
        console.log(counter)
      return;
    }

    // has player won?
    // uptade appropriate box with numbers of bombs it touches
    // if [x;y] not tuching bomb, open all not tuching bomb, else
    //show number of how many bombs item tuches. 
  });
};

var div = document.getElementById('foo');


function createRow(columnNumber, numberOfBoxes) {
  var row = document.createElement("div");
  row.className = "rowOfBoxes";
  for (let x = 0; x < numberOfBoxes; x++) {
    var box = document.createElement("div");
    box.className = "box";
    box.id = x + ";" + columnNumber;
    box.addEventListener("click", boxClicked);
    row.appendChild(box);
  }
  return row;
}

var mineloc = [1, 2];

function checkStatusOfGame(mineloc) {}
