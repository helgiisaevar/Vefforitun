function doAjax() {
    //Prepare the parameter value for 'myParam'
    var paramValue = "someValue";

    //The URL to which we will send the request
    var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { myParam: paramValue })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            document.getElementById("changeMe").innerHTML = response.data;
            document.getElementById("changeMe1").innerHTML = "SJÉRÐU EKKI ARRAYI-IÐ....TO BAD";
            
            myArray.nodeValue = response.data;
            myHead = response.data;
            console.log("Success: ", response.data);
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error + "my error by raggi");
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}