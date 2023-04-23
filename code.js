const board = document.getElementById("chess-board");
var clicks = [];
var moves = [];
board.addEventListener(`click`, (ev) =>
{
    var square = ev.target;
    clicks[clicks.length] = square;
    // White Pawn move
    if (square.innerText == `♙`)
    {
        var startX = square.id.substring(0,1);
        var startY = square.id.substring(1,2);
        var tempY1 = parseInt(startY) + 1;
        var tempY2 = parseInt(startY) + 2;
        var tempX1 = parseInt(startX) + 1;
        var tempX2 = parseInt(startX) - 1;
        var tempSquare1 = document.getElementById(`${startX}${tempY1}`);
        var tempSquare2 = document.getElementById(`${startX}${tempY2}`);
        var tempSquare3 = document.getElementById(`${tempX1}${tempY1}`);
        var tempSquare4 = document.getElementById(`${tempX2}${tempY1}`);
        square.style.backgroundColor = "blue";
        if (tempSquare1.innerText == ``)
        {
            tempSquare1.style.backgroundColor = "yellow";
        }
        if (tempSquare1.innerText == `` && square.id.substring(1,2) == `2`)
        {
            tempSquare2.style.backgroundColor = "yellow";
        }
        if (tempSquare3.classList.contains(`black`))
        {
            tempSquare3.style.backgroundColor = "yellow";
        }
        if (tempSquare4.classList.contains(`black`))
        {
            tempSquare4.style.backgroundColor = "yellow";
        }
    }
    // Black Pawn move
    if (square.innerText == `♟` && square.id.substring(1,2) == `2`)
    {
        var startX = square.id.substring(0,1);
        var startY = square.id.substring(1,2);
        var tempY1 = parseInt(startY) - 1;
        var tempY2 = parseInt(startY) - 2;
        var tempX1 = parseInt(startX) + 1;
        var tempX2 = parseInt(startX) - 1;
        var tempSquare1 = document.getElementById(`${startX}${tempY1}`);
        var tempSquare2 = document.getElementById(`${startX}${tempY2}`);
        var tempSquare3 = document.getElementById(`${tempX1}${tempY1}`);
        var tempSquare4 = document.getElementById(`${tempX2}${tempY1}`);
        square.style.backgroundColor = "blue";
        if (tempSquare1.innerText == ``)
        {
            tempSquare1.style.backgroundColor = "yellow";
        }
        if (tempSquare1.innerText == `` && square.id.substring(1,2) == `2`)
        {
            tempSquare2.style.backgroundColor = "yellow";
        }
        if (tempSquare3.classList.contains(`white`))
        {
            tempSquare3.style.backgroundColor = "yellow";
        }
        if (tempSquare4.classList.contains(`white`))
        {
            tempSquare4.style.backgroundColor = "yellow";
        }
    }
    // White Knight move
    if (square.innerText == `♘`)
    {
        square.style.backgroundColor = "blue";
        var startX = square.id.substring(0,1);
        var startY = square.id.substring(1,2);
        for (i = 1; i < 9; i++)
        {
            for (j = 1; j < 9; j++)
            {
                var x = Math.abs(startX - i);
                var y = Math.abs(startY - j);
                var tempSquare1 = document.getElementById(`${i}${j}`);
                if (x * y == 2 && !tempSquare1.classList.contains(`white`))
                {
                    tempSquare1.style.backgroundColor = "yellow";
                }
            }
        }
    }
    // Black Knight move
    if (square.innerText == `♞`)
    {
        square.style.backgroundColor = "blue";
        var startX = square.id.substring(0,1);
        var startY = square.id.substring(1,2);
        for (i = 1; i < 9; i++)
        {
            for (j = 1; j < 9; j++)
            {
                var x = Math.abs(startX - i);
                var y = Math.abs(startY - j);
                var tempSquare1 = document.getElementById(`${i}${j}`);
                if (x * y == 2 && !tempSquare1.classList.contains(`black`))
                {
                    tempSquare1.style.backgroundColor = "yellow";
                }
            }
        }
    }
    if (square.style.backgroundColor == "yellow")
    {
        square.innerText = clicks[0].innerText;
        clicks[0].innerText = ``;
        if (clicks[0].classList.contains(`white`))
        {
            clicks[0].classList.remove(`white`);
            square.classList.add(`white`);
            if (square.classList.contains(`black`))
            {
                square.classList.remove(`black`);
            }
        }
        if (clicks[0].classList.contains(`black`))
        {
            clicks[0].classList.remove(`black`);
            square.classList.add(`black`);
            if (square.classList.contains(`white`))
            {
                square.classList.remove(`white`);
            }
        }
    }
    if (clicks.length >= 2)
    {
        moves[moves.length] = clicks[0];
        moves[moves.length] = clicks[1];
        clicks.length = 0;
        resetBoardColor();
    }
});
const resetBoardColor = () =>
{
    for (i = 1; i < 9; i++)
        {
            for (j = 1; j < 9; j++)
            {
                if ((i + j) % 2 == 0)
                {
                    document.getElementById(`${i}${j}`).style.backgroundColor = `#03660b`;
                }
                else
                {
                    document.getElementById(`${i}${j}`).style.backgroundColor = `#eee`;
                }
            }
        }
}