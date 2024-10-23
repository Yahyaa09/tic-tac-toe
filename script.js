
let boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".game-info");
let Btn = document.querySelector(".Btn");

let currPlayer;
let gameGrid;

const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

//initialise function

function init()
{
    //set current player as X
    currPlayer="X";
    gameInfo.innerText= `Current Player - ${currPlayer}`;

    //set tic tac toe to empty

    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    //hide new game

    Btn.classList.remove("active");
    
    
}
//call initialise function
init();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleclick(index);
    })
});

function handleclick(index)
{
    //check if box is empty or not
    if(gameGrid[index]==="")
    {
        //set in UI
        boxes[index].innerText = currPlayer;
        //update in grid
        gameGrid[index]= currPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap turn 
        swapTurn();

        //check if someone won
        checkgameOver();
    }
    //else do nothing(unclickable);
}

function swapTurn()
{

    if(currPlayer=="X")
    {
        currPlayer = "O";
    }
    else
    {
        currPlayer = "X";
    }

    //update in UI
    gameInfo.innerText= `Current Player - ${currPlayer}`;

}

Btn.addEventListener('click',init);

//winning logic (will do tommorrow 1:13:00 5:21 AM 3|AUG|24)

function checkgameOver() {
    let ans = "";

    winningCombinations.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
            (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[2]] === gameGrid[position[1]])) {
            //check for winner
            if (gameGrid[position[0]] === "X") {
                ans = "X";
            } else {
                ans = "O";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (ans !== "") {
        gameInfo.innerText = `Winner Player - ${ans}`;
        Btn.classList.add("active");
    }

    //when there is no winner
    let count = 0;

    gameGrid.forEach((box)=>{
        if(box!=="")
        {
            count++;
        }
    });

    if(count===9)
    {
        gameInfo.innerText = "Game Tied!";
        Btn.classList.add("active");
    }
}






