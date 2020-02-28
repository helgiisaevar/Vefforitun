function doAjax(rowCount, columCount, mineCount) {
    // getting values by ID in html file
    validateInput(rowCount, columCount, mineCount);
    var rows = document.getElementById(rowCount).value;
    var columns = parseInt(document.getElementById(columCount).value);
    var mines = parseInt(document.getElementById(mineCount).value);
    
    var paramValue = {"rows":rows, "cols":columns,"mines": mines}
    //Prepare the parameter value for 'myParam'
    //var paramValue = "/" + rows + "/" + columns + "/" + mines;

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, paramValue)
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            document.getElementById("changeMe").innerHTML = response.data;
            console.log("Success: ", response.data);
            console.log(paramValue)
        })
        .catch(function (error) {
            //When unsuccessful, print the error and make the default board
            console.log(error + " my error by raggi");
            generateDefaultBoard();
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}

function validateInput(rowCount, columCount, mineCount){
    // just need a short validation check here
    document.getElementById("changeMe").innerHTML = "doing validation check"
    document.getElementById("changeMe1").innerHTML = "Validation checked out";
}

function generateDefaultBoard(){
 //generates a default board
    generateBoard(10,10,10);
};

function generateBoard(rows, cols, mines){
    
}

function printBoard(data) {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let number = data[x][y];
            let elem = getid('cell' + x + y);
            if (number === ".") {
                elem.value = '';
                elem.disabled = false;
            } else {
                elem.value = number;
                elem.disabled = true;
            }
        }
    }
}