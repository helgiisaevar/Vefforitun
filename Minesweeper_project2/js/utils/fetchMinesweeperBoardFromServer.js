function fetchMinesweeperBoardFromServer(rows, cols, mines) {
  var url = "https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper";

  return axios
    .post(url, { rows, cols, mines })
    .then(response => {
      console.log("Success: ", response.data);

      console.log(paramValue);
      console.log(response.data);
      return response.data.board;
    })
    .catch(error => {
      //When unsuccessful, print the error and make the default board
      console.log(error + " my error by raggi");
     // generateDefaultBoard();
    });
}

