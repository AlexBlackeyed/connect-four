let player1 = true;

//The Real Life Board in a 2D Array.
let board = [
    ["","","","","","","",],
    ["","","","","","","",],
    ["","","","","","","",],
    ["","","","","","","",],
    ["","","","","","","",],
    ["","","","","","","",],
];


function changeTurn(player1) {
    //Changes Token Colour and Player's Turn Text.
    let player = document.getElementById("player");
    let choices = document.getElementById("connectFourGrid").getElementsByTagName("div");
    setTimeout(() => {
        if (player1) {
            player.innerHTML = "Player 2's Turn";
        } else {
            player.innerHTML = "Player 1's Turn";
        }
        for (let i = 0; i < 7; i++) {
            choices.item(i).classList.toggle("hover-bg-red");
            choices.item(i).classList.toggle("hover-bg-yellow");
        }
    }, 400);
}

function boardCordsToHtmlNum(row,col) {
    //Converts the given 2D Array coordinates to the square's div number in the DOM.
    let rowCount = (row+1) * 7;
    let finalThesis = rowCount + col + 1;
    return finalThesis;
}

function htmlNumToBoardCords(squareNum) {
    //Converts the given square's div number in the DOM to 2D Array Coordinates.
    let row = Math.floor(squareNum / 7);
    let col = squareNum % 7;
    row -= 1;
    col -= 1;
    return [row,col];
}

function reset() {
    //Resets the game by loading the Start Screen.
    location.reload();
}

function fall(col) {
    /*Places token in the correct spot and changes the colour of the token to the player's one.
    If not possible asks to play again.
    Checks if the game ends after that token placement and if so, deletes all the choices,
    colours the winning blocks, announces winner and creates Reset Button.
     */
    let rowsAndCols = document.getElementById("connectFourGrid").getElementsByTagName("div");
    let circleColour;
    let squareNum;
    for (let row = 5; row > -1; row--) {
        if (board[row][col] == "" ) {
            if (player1) {
                board[row][col] = "1";                
            }
            else {
                board[row][col] = "2";
            }
            squareNum = boardCordsToHtmlNum(row,col);
            for (let i = 0; i < rowsAndCols.length; i++) {
                let element = rowsAndCols.item(i);
                if (element.getAttribute("value") == squareNum) {
                    if (player1) {
                        circleColour = "#DAB147";
                    }
                    else {
                        circleColour = "#DA4747";
                    }
                    createChild(element,"div","checker2");
                    element.children.item(0).style.backgroundColor = circleColour;
                }
            }
            break;
        }
        else if (row == 0 && board[row][col] != "") {
            if (player1) {
                player.innerHTML = "Oops. Can't place Token! Try Again Player 1";
            } 
            else {
                player.innerHTML = "Oops. Can't place Token! Try Again Player 2";
            }
            return 0;
        }
    }
    if (checkForFourMain(player1,board)) {
        let choices = document.getElementById("connectFourGrid").getElementsByTagName("div");
        for (let i = 6; i > -1; i--) {
            choices.item(i).remove();
        }
        createChild(document.getElementById("wrapper"),"input","block py-2 bg-red-500 font-semibold text-2xl rounded-lg mt-4 w-56 mx-auto hover:cursor-pointer",{attributes : ["onclick","type","value"],values : ["reset()","button","Reset"]})
        return 0;
    }
    //Change Player
    changeTurn(player1);
    player1 = !player1;
}

function changeBlockColours(array,player1,rowsAndCols) {
    //When The Game ends it colours the winning token cells in the board according to what player won.
    array.forEach(number => {
        for (let i = 0; i < rowsAndCols.length; i++) {
            if (number == rowsAndCols.item(i).getAttribute("value")) {
                if (player1) {
                    rowsAndCols.item(i).style.backgroundColor = "#DAB147";
                }
                else {
                    rowsAndCols.item(i).style.backgroundColor = "#DA4747";
                }
            }
            
        }
    });
}