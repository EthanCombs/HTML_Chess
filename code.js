const board = document.getElementById("chess-board");
var previousSquare; // previous move end square
var previousLastSquare; // previous move start square
var lastSquare; // start square
var square; // end square
var whiteTurn = true;
var takenPieces = [];
board.addEventListener(`click`, (ev) =>
{
    square = ev.target;
    // Shows possible moves
    if (square.style.backgroundColor != "yellow")
    {
        resetBoardColor();
        lastSquare = square;
        if (whiteTurn)
        {
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
                var tempSquare5 = document.getElementById(`${tempX1}${startY}`);
                var tempSquare6 = document.getElementById(`${tempX2}${startY}`);
                square.style.backgroundColor = "blue";
                if (tempSquare1.innerText == ``)
                {
                    tempSquare1.style.backgroundColor = "yellow";
                    if (tempSquare2.innerText == `` && square.id.substring(1,2) == `2`)
                    {
                        tempSquare2.style.backgroundColor = "yellow";
                    }
                }
                if (tempX1 < 9 && tempSquare3.classList.contains(`black`))
                {
                    tempSquare3.style.backgroundColor = "yellow";
                }
                if (tempX2 > 0 && tempSquare4.classList.contains(`black`))
                {
                    tempSquare4.style.backgroundColor = "yellow";
                }
                if (tempX1 < 9 && tempSquare5.innerText == `♟` && previousSquare.id == tempSquare5.id && previousLastSquare.id.substring(1,2) == `7`)
                {
                    tempSquare3.style.backgroundColor = "yellow";
                }
                if (tempX2 > 0 && tempSquare6.innerText == `♟` && previousSquare.id == tempSquare6.id && previousLastSquare.id.substring(1,2) == `7`)
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
            // White Bishop move
            if (square.innerText == `♗`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `b`) && testSquares(startX, startY, i, j, `b`) && !tempSquare1.classList.contains(`white`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // White Rook move
            if (square.innerText == `♖`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `r`) && testSquares(startX, startY, i, j, `r`) && !tempSquare1.classList.contains(`white`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // White Queen move
            if (square.innerText == `♕`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `q`) && testSquares(startX, startY, i, j, `q`) && !tempSquare1.classList.contains(`white`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // White King move
            if (square.innerText == `♔`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (((x == 1 && y == 1) || (x == 1 && y == 0) || (x == 0 && y == 1)) && !tempSquare1.classList.contains(`white`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
                if (square.classList.contains(`hasNotMoved`))
                {
                    const a1 = document.getElementById(`11`);
                    const b1 = document.getElementById(`21`);
                    const c1 = document.getElementById(`31`);
                    const d1 = document.getElementById(`41`);
                    const f1 = document.getElementById(`61`);
                    const g1 = document.getElementById(`71`);
                    const h1 = document.getElementById(`81`);
                    if (a1.innerText == `♖` && a1.classList.contains(`hasNotMoved`) && b1.innerText == `` && c1.innerText == `` && d1.innerText == ``)
                    {
                        c1.style.backgroundColor = "yellow";
                    }
                    if (h1.innerText == `♖` && h1.classList.contains(`hasNotMoved`) && f1.innerText == `` && g1.innerText == ``)
                    {
                        g1.style.backgroundColor = "yellow";
                    }
                }
            }
        }
        else
        {
            // Black Pawn move
            if (square.innerText == `♟`)
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
                var tempSquare5 = document.getElementById(`${tempX1}${startY}`);
                var tempSquare6 = document.getElementById(`${tempX2}${startY}`);
                square.style.backgroundColor = "blue";
                if (tempSquare1.innerText == ``)
                {
                    tempSquare1.style.backgroundColor = "yellow";
                    if (tempSquare2.innerText == `` && square.id.substring(1,2) == `7`)
                    {
                        tempSquare2.style.backgroundColor = "yellow";
                    }
                }
                if (tempX1 < 9 && tempSquare3.classList.contains(`white`))
                {
                    tempSquare3.style.backgroundColor = "yellow";
                }
                if (tempX2 > 0 && tempSquare4.classList.contains(`white`))
                {
                    tempSquare4.style.backgroundColor = "yellow";
                }
                if (tempX1 < 9 && tempSquare5.innerText == `♙` && previousSquare.id == tempSquare5.id && previousLastSquare.id.substring(1,2) == `2`)
                {
                    tempSquare3.style.backgroundColor = "yellow";
                }
                if (tempX2 > 0 && tempSquare6.innerText == `♙` && previousSquare.id == tempSquare6.id && previousLastSquare.id.substring(1,2) == `2`)
                {
                    tempSquare4.style.backgroundColor = "yellow";
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
            // Black Bishop move
            if (square.innerText == `♝`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `b`) && testSquares(startX, startY, i, j, `b`) && !tempSquare1.classList.contains(`black`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // Black Rook move
            if (square.innerText == `♜`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `r`) && testSquares(startX, startY, i, j, `r`) && !tempSquare1.classList.contains(`black`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // Black Queen move
            if (square.innerText == `♛`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (canMove(x, y, `q`) && testSquares(startX, startY, i, j, `q`) && !tempSquare1.classList.contains(`black`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
            }
            // Black King move
            if (square.innerText == `♚`)
            {
                square.style.backgroundColor = "blue";
                var startX = parseInt(square.id.substring(0,1));
                var startY = parseInt(square.id.substring(1,2));
                for (i = 1; i < 9; i++)
                {
                    for (j = 1; j < 9; j++)
                    {
                        var x = Math.abs(startX - i);
                        var y = Math.abs(startY - j);
                        var tempSquare1 = document.getElementById(`${i}${j}`);
                        if (((x == 1 && y == 1) || (x == 1 && y == 0) || (x == 0 && y == 1)) && !tempSquare1.classList.contains(`black`))
                        {
                            tempSquare1.style.backgroundColor = "yellow";
                        }
                    }
                }
                if (square.classList.contains(`hasNotMoved`))
                {
                    const a8 = document.getElementById(`18`);
                    const b8 = document.getElementById(`28`);
                    const c8 = document.getElementById(`38`);
                    const d8 = document.getElementById(`48`);
                    const f8 = document.getElementById(`68`);
                    const g8 = document.getElementById(`78`);
                    const h8 = document.getElementById(`88`);
                    if (a8.innerText == `♜` && a8.classList.contains(`hasNotMoved`) && b8.innerText == `` && c8.innerText == `` && d8.innerText == ``)
                    {
                        c8.style.backgroundColor = "yellow";
                    }
                    if (h8.innerText == `♜` && h8.classList.contains(`hasNotMoved`) && f8.innerText == `` && g8.innerText == ``)
                    {
                        g8.style.backgroundColor = "yellow";
                    }
                }
            }
        }
    }
    // Makes move
    else
    {
        // En passant
        if ((lastSquare.innerText == `♙` || lastSquare.innerText == `♟`) && square.innerText == `` && lastSquare.id.substring(0,1) != square.id.substring(0,1))
        {
            previousSquare.innerText = ``;
        }

        // Moves piece
        if (square.innerText != ``)
        {
            takenPieces[takenPieces.length] = square.innerText;
        }
        square.innerText = lastSquare.innerText;
        lastSquare.innerText = ``;

        // Checks for win
        if (takenPieces[length - 1] == `♔`)
        {
            alert(`Black wins!`);
            location.reload();
        }
        if (takenPieces[length - 1] == `♚`)
        {
            alert(`White wins!`);
            location.reload();
        }

        // White Castle long
        if (square.innerText == `♔` && square.id == `31`)
        {
            document.getElementById(`11`).innerText = ``;
            document.getElementById(`11`).classList.remove(`white`);
            document.getElementById(`41`).innerText = `♖`;
            document.getElementById(`41`).classList.add(`white`);
        }
        // White Castle short
        if (square.innerText == `♔` && square.id == `71`)
        {
            document.getElementById(`81`).innerText = ``;
            document.getElementById(`81`).classList.remove(`white`);
            document.getElementById(`61`).innerText = `♖`;
            document.getElementById(`61`).classList.add(`white`);
        }
        // Black Castle long
        if (square.innerText == `♚` && square.id == `38`)
        {
            document.getElementById(`18`).innerText = ``;
            document.getElementById(`18`).classList.remove(`black`);
            document.getElementById(`48`).innerText = `♜`;
            document.getElementById(`48`).classList.add(`black`);
        }
        // Black Castle short
        if (square.innerText == `♚` && square.id == `78`)
        {
            document.getElementById(`88`).innerText = ``;
            document.getElementById(`88`).classList.remove(`black`);
            document.getElementById(`68`).innerText = `♜`;
            document.getElementById(`68`).classList.add(`black`);
        }

        // White pawn promotion
        if (square.innerText == `♙` && square.id.substring(1,2) == `8`)
        {
            // Need to add promotion popup here
            square.innerText = `♕`;
        }
        // Black pawn promotion
        if ( square.innerText == `♟` && square.id.substring(1,2) == `1`)
        {
            // Need to add promotion popup here
            square.innerText = `♛`;
        }

        // Variable/class updates
        if (lastSquare.classList.contains(`hasNotMoved`))
        {
            lastSquare.classList.remove(`hasNotMoved`);
        }
        if (lastSquare.classList.contains(`white`))
        {
            lastSquare.classList.remove(`white`);
            square.classList.add(`white`);
            if (square.classList.contains(`black`))
            {
                square.classList.remove(`black`);
            }
            whiteTurn = false;
        }
        if (lastSquare.classList.contains(`black`))
        {
            lastSquare.classList.remove(`black`);
            square.classList.add(`black`);
            if (square.classList.contains(`white`))
            {
                square.classList.remove(`white`);
            }
            whiteTurn = true;
        }
        previousLastSquare = lastSquare;
        previousSquare = square;
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

const testSquares = (startX, startY, endX, endY, piece) =>
{
    if (startX > endX && startY > endY)
    {
        for (x = startX - 1; x > endX; x--)
        {
            for (y = startY - 1; y > endY; y--)
            {
                var absX = Math.abs(startX - x);
                var absY = Math.abs(startY - y);
                if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
                {
                    return false;
                }
            }
        }
    } 
    else if (startX < endX && startY < endY)
    {
        for (x = startX + 1; x < endX; x++)
        {
            for (y = startY + 1; y < endY; y++)
            {
                var absX = Math.abs(startX - x);
                var absY = Math.abs(startY - y);
                if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
                {
                    return false;
                }
            }
        }
    } 
    else if (startX > endX && startY < endY)
    {
        for (x = startX - 1; x > endX; x--)
        {
            for (y = startY + 1; y < endY; y++)
            {
                var absX = Math.abs(startX - x);
                var absY = Math.abs(startY - y);
                if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
                {
                    return false;
                }
            }
        }
    } 
    else if (startX < endX && startY > endY)
    {
        for (x = startX + 1; x < endX; x++)
        {
            for (y = startY - 1; y > endY; y--)
            {
                var absX = Math.abs(startX - x);
                var absY = Math.abs(startY - y);
                if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
                {
                    return false;
                }
            }
        }
    } 
    else if (startX == endX && startY > endY) 
    {
        for (y = startY - 1; y > endY; y--)
        {
            x = startX;
            var absX = Math.abs(startX - x);
            var absY = Math.abs(startY - y);
            if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
            {
                return false;
            }
        }
    } 
    else if (startX == endX && startY < endY) 
    {
        for (y = startY + 1; y < endY; y++)
        {
            x = startX;
            var absX = Math.abs(startX - x);
            var absY = Math.abs(startY - y);
            if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
            {
                return false;
            }
        }
    } 
    else if (startX > endX && startY == endY) 
    {
        for (x = startX - 1; x > endX; x--)
        {
            y = startY;
            var absX = Math.abs(startX - x);
            var absY = Math.abs(startY - y);
            if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
            {
                return false;
            }
        }
    } 
    else 
    {
        for (x = startX + 1; x < endX; x++)
        {
            y = startY;
            var absX = Math.abs(startX - x);
            var absY = Math.abs(startY - y);
            if (canMove(absX, absY, piece) && document.getElementById(`${x}${y}`).innerText != ``)
            {
                return false;
            }
        }
    }
    return true;
}

const canMove = (absX, absY, piece) =>
{
    return ((absX / absY == 1 && (piece == `b` || piece == `q`)) ||  ((absX > 0 && absY == 0 || absX == 0 && absY > 0) && (piece == `r` || piece == `q`)))
}