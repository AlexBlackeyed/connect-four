function createBoard() {
    // Creates a 7x7 Grid (6 rows for the game, 1 row for throw selection).
    let grid= document.getElementById("connectFourGrid");
    grid.classList.add("grid","grid-cols-7","grid-rows-7","w-[700px]","h-[600px]","mx-auto","mt-24");
    
    createChoices(grid);
    
    let colour = true;
    let startingValue = 7;
    for (let i = 0; i < 6; i++) {
        if (colour.valueOf()) {
            createRow(grid,colour,startingValue);
            colour = false;
        }
        
        else {
            createRow(grid,colour,startingValue);
            colour = true;
        }
        startingValue += 7;
    }
}

function createChild(parent,tag,classes,attrs) {
    // A general function for quick child creation.
    let child = document.createElement(tag);
    if (classes != "") {
        classes = classes.split(" ");
        classes.forEach(itemClass => {
            child.classList.add(itemClass);
        });
    }
    if (attrs) {
        for (let i = 0; i < attrs.attributes.length; i++) {
            child.setAttribute(attrs.attributes[i],attrs.values[i]);
        }
    }
    parent.appendChild(child);

}

function createRow(grid,colour,startingValue) {
    // Creates 7 children, one for each row.
    let attrObject = {
        attributes : ["value"],
        values : [startingValue]
    };
    for (let i = 0; i < 7; i++) {
        attrObject.values[0] += 1
        if (colour) {
            createChild(grid,"div","box1",attrObject);   
        } else {
            createChild(grid,"div","box2",attrObject);
        }
        colour = !colour;
    }
}

function createChoices(grid) {
    // Creates the throw choices.
    for (let col = 0; col < 7; col++) {
        let attrObject = {
            attributes : ["onclick"],
            values : [`fall(${col})`]
        };
        createChild(grid,"div","checker hover-bg-yellow",attrObject);
    }
}


function init() {
    // Start Button and Game Initiation.
    let startButton = document.getElementById("startButton");
    startButton.remove();
    let player = document.createElement("h1");
    player.innerHTML = "Player 1's Turn";
    player.classList.add("text-white", "text-4xl","text-center","font-bold");
    player.setAttribute("id","player");
    document.getElementById("wrapper").prepend(player);
    createBoard();

}