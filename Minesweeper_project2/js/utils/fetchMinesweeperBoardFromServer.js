let COLUMNS;
let ROWS;
let MINES;

function fetchMinesweeperBoardFromServer(rows, cols, mines) {
  var url = "https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper";
  console.log(rows)
  console.log(mines)
  ROWS = parseInt(document.getElementById(rows).value);
  COLUMNS = parseInt(document.getElementById(cols).value);
  MINES = parseInt(document.getElementById(mines).value);

  validation = validateInput(ROWS, COLUMNS, MINES);
  if (validation < 0) {
    return;
  }
  console.log(ROWS)
  var paramValue = { rows: ROWS, cols: COLUMNS, mines: MINES };

  return axios
    .post(url, paramValue)
    .then(response => {
      console.log("Success: ", response.data);

      console.log(paramValue);
      console.log(response.data);
      generateBoard();
      MINES = response.data.board.minePositions;
      
      
      return response.data.board;
    })
    .catch(error => {
      //When unsuccessful, print the error and make the default board
      console.log(error + " ERROR");
      ROWS = 10
      COLUMNS = 10
      MINES = [[0,4], [0,6], [0,7], [3,1], [5,7], [6,4], [6,9], [7,6], [7,9],[9,2]]
      // generateDefaultBoard();
    });
}

function validateInput(rowCount, columCount, mineCount) {
  if (rowCount * columCount < mineCount) {
    document.getElementById("errorMsg").style.display = "inline";
    document.getElementById("errorMsg").innerHTML =
      "too many mines, please input less mines";
    return -1;
  }

  if (
    rowCount > 40 ||
    rowCount < 0 ||
    columCount > 40 ||
    columCount < 0 ||
    mineCount > 1600 ||
    mineCount < 0
  ) {
    document.getElementById("errorMsg").style.display = "inline";
    document.getElementById("errorMsg").innerHTML =
      "you can not have more then 40 rows and 40 columns and more then 1600 mines";
    return -1;
  } 

  // if (isNaN(rowCount) || isNaN(columCount) || isNaN(mineCount)) {
  //   console.log("this is running");
  //   rowCount = 10;
  //   columCount = 10;
  //   mineCount = 2;
  //   fetchMinesweeperBoardFromServer(5, 5, 3);
  //   return 1;
  // }

  document.getElementById("errorMsg").style.display = "none";
  return 1;
}
