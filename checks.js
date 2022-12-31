let array;
function checkForFourMain(player1,board) {
    //Conducts all the checks and calls the functions needed to end the game.
    let rowsAndCols = document.getElementById("connectFourGrid").getElementsByTagName("div");
    let search;
    let player = document.getElementById("player");
    let found = false;
    if (player1) {
        search = "1";
    }
    else {
        search = "2";
    }
    
    let hor = checkForFourHor(search,found);
    let ver = checkForFourVer(search,found);
    let diag = checkForFourDiag(search,found);

    if (hor[0] || ver[0] || diag[0]) {
        player.innerHTML = `Winner is Player ${search}`;
        if (hor.length > 1) {
            changeBlockColours(hor[1],player1,rowsAndCols);
        }
        if (ver.length > 1) {
            changeBlockColours(ver[1],player1,rowsAndCols);
        }
        if (diag.length > 1) {
            changeBlockColours(diag[1],player1,rowsAndCols);
        }
    }
    else if (!(hor[0] || ver[0] || diag[0]) && isBoardFull(board)) {
        player.innerHTML = "Tie";
    }
    return (hor[0] || ver[0] || diag[0] || isBoardFull(board));
}


function isBoardFull(board) {
    //Checks whether all the cells in the array have a value different than "". If so, returns true, else false.
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == "") {
                return false;
            }
            
        }
        
    }
    return true;
}


function checkForFourHor(search,found) {
    //Checks whether four tokens are connected horizontally, if so returns an array of their square's number in the DOM, else returns false.
    for (let i = 5; i > -1; i--) {
        for (let j = 0; j < board[i].length -3; j++) {
            if (board[i][j] === search && board[i][j+1] === search && board[i][j+2] === search && board[i][j+3] === search) {
                found = true;
                array = [boardCordsToHtmlNum(i,j),boardCordsToHtmlNum(i,j+1),boardCordsToHtmlNum(i,j+2),boardCordsToHtmlNum(i,j+3)];
                return [found,array];
            }
        }
        
    }
    return [found];
}

function checkForFourVer(search,found) {
    //Checks whether four tokens are connected Vertically, if so returns an array of their square's number in the DOM, else returns false.
    for (let i = 5; i > 2; i--) {
        for (let j = 0; j < board[i].length -3; j++) {
            if (board[i][j] === search && board[i-1][j] === search && board[i-2][j] === search && board[i-3][j] === search) {
                found = true;
                array = [boardCordsToHtmlNum(i,j),boardCordsToHtmlNum(i-1,j),boardCordsToHtmlNum(i-2,j),boardCordsToHtmlNum(i-3,j)];
                return [found,array];
            }
        }
        
    }
    return [found];
}


function checkForFourDiag(search,found) {
    //Checks whether four tokens are connected diagonally, if so returns an array of their square's number in the DOM, else returns false.
    for (let i = 5; i > 2; i--) {
        for (let j = 0; j < board[i].length -3; j++) {
            if (board[i][j] === search && board[i-1][j+1] === search && board[i-2][j+2] === search && board[i-3][j+3] === search) {
                found = true;
                array = [boardCordsToHtmlNum(i,j),boardCordsToHtmlNum(i-1,j+1),boardCordsToHtmlNum(i-2,j+2),boardCordsToHtmlNum(i-3,j+3)];
                return [found,array];
            }
        }
        
    }
    for (let i = 5; i > 2; i--) {
        for (let j = 0; j < board[i].length -3; j++) {
            if (board[i][j] === search && board[i-1][j-1] === search && board[i-2][j-2] === search && board[i-3][j-3] === search) {
                found = true;
                array = [boardCordsToHtmlNum(i,j),boardCordsToHtmlNum(i-1,j-1),boardCordsToHtmlNum(i-2,j-2),boardCordsToHtmlNum(i-3,j-3)];
                return [found,array];
            }
        }
        
    }
    return [found];
}