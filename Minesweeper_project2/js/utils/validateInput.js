function validateInput(rowCount, columCount, mineCount){
    if(rowCount* columCount < mineCount){
        document.getElementById("errorMsg").style.display = "inline"
        return -1;
    }

    if(rowCount > 40 || rowCount < 0 || columCount > 40 || columCount < 0 || mineCount > 1600 || mineCount < 0  ){
        document.getElementById("errorMsg").style.display = "inline"
        return -1;
    }

    document.getElementById("errorMsg").style.display = "none"
    return 1;
}
