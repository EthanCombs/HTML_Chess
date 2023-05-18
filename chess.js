const board = document.getElementById("chess-board");
var previousSquare; // previous move end square
var previousLastSquare; // previous move start square
var lastSquare; // start square
var square = document.getElementById(`18`); // end square
var whiteTurn = true;
var takenPieces = [];
var promotion = false;
var boardRect = board.getBoundingClientRect();
var rect = square.getBoundingClientRect();
var boardX = boardRect.left;
var boardY = boardRect.top;
var centerX = rect.left + 28 - boardX;
var centerY = rect.top + 28 - boardY;
const h3 = document.querySelector(`h3`);
var moved;
var notTest = true;
var dotTest = false;
var oldClickWasNotMove = true;
var p1Name = "White";
var p2Name = "Black";
var gameOver = false;
const gameOverDiv = document.getElementById(`gameOverPopup`);
const takenWhitePiecesDiv = document.getElementById(`takenWhitePieces`);
var takenWhitePieces = ``;
const takenBlackPiecesDiv = document.getElementById(`takenBlackPieces`);
var takenBlackPieces = ``;
var nameFormOpen = true;
var timeFormOpen = true;

document.body.addEventListener(`click`, (ev) =>
{
    dotTest = false;
    square = ev.target;
    if (!promotion && !gameOver && !nameFormOpen && !timeFormOpen)
    {
        // Shows possible moves
        if (!testForDot(square))
        {
            if (notTest) oldClickWasNotMove = true;
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
                    if (tempSquare1.innerText == `` && validMove(square, tempSquare1))
                    {
                        overlayDot(tempSquare1);
                        if (square.id.substring(1,2) == `2` && validMove(square, tempSquare2) && tempSquare2.innerText == ``)
                        {
                            overlayDot(tempSquare2);
                        }
                    }
                    if (tempX1 < 9 && tempSquare3.classList.contains(`black`) && validMove(square, tempSquare3))
                    {
                        overlayDot(tempSquare3);
                    }
                    if (tempX2 > 0 && tempSquare4.classList.contains(`black`) && validMove(square, tempSquare4))
                    {
                        overlayDot(tempSquare4);
                    }
                    if (tempX1 < 9 && tempSquare5.innerText == `♟` && previousSquare.id == tempSquare5.id && previousLastSquare.id.substring(1,2) == `7` && validMove(square, tempSquare3))
                    {
                        overlayDot(tempSquare3);
                    }
                    if (tempX2 > 0 && tempSquare6.innerText == `♟` && previousSquare.id == tempSquare6.id && previousLastSquare.id.substring(1,2) == `7` && validMove(square, tempSquare4))
                    {
                        overlayDot(tempSquare4);
                    }
                }
                // White Knight move
                if (square.innerText == `♘`)
                {
                    var startX = square.id.substring(0,1);
                    var startY = square.id.substring(1,2);
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (x * y == 2 && !tempSquare1.classList.contains(`white`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // White Bishop move
                if (square.innerText == `♗`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♗`) && testSquares(startX, startY, i, j, `♗`) && !tempSquare1.classList.contains(`white`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // White Rook move
                if (square.innerText == `♖`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♖`) && testSquares(startX, startY, i, j, `♖`) && !tempSquare1.classList.contains(`white`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // White Queen move
                if (square.innerText == `♕`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♕`) && testSquares(startX, startY, i, j, `♕`) && !tempSquare1.classList.contains(`white`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // White King move
                if (square.innerText == `♔`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (((x == 1 && y == 1) || (x == 1 && y == 0) || (x == 0 && y == 1)) && !tempSquare1.classList.contains(`white`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
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
                            overlayDot(c1);
                        }
                        if (h1.innerText == `♖` && h1.classList.contains(`hasNotMoved`) && f1.innerText == `` && g1.innerText == ``)
                        {
                            overlayDot(g1);
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
                    if (tempSquare1.innerText == `` && validMove(square, tempSquare1))
                    {
                        overlayDot(tempSquare1);
                        if (square.id.substring(1,2) == `7` && tempSquare2.innerText == `` && validMove(square, tempSquare2))
                        {
                            overlayDot(tempSquare2);
                        }
                    }
                    if (tempX1 < 9 && tempSquare3.classList.contains(`white`) && validMove(square, tempSquare3))
                    {
                        overlayDot(tempSquare3);
                    }
                    if (tempX2 > 0 && tempSquare4.classList.contains(`white`) && validMove(square, tempSquare4))
                    {
                        overlayDot(tempSquare4);
                    }
                    if (tempX1 < 9 && tempSquare5.innerText == `♙` && previousSquare.id == tempSquare5.id && previousLastSquare.id.substring(1,2) == `2` && validMove(square, tempSquare3))
                    {
                        overlayDot(tempSquare3);
                    }
                    if (tempX2 > 0 && tempSquare6.innerText == `♙` && previousSquare.id == tempSquare6.id && previousLastSquare.id.substring(1,2) == `2` && validMove(square, tempSquare4))
                    {
                        overlayDot(tempSquare4);
                    }
                }
                // Black Knight move
                if (square.innerText == `♞`)
                {
                    var startX = square.id.substring(0,1);
                    var startY = square.id.substring(1,2);
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (x * y == 2 && !tempSquare1.classList.contains(`black`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // Black Bishop move
                if (square.innerText == `♝`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♝`) && testSquares(startX, startY, i, j, `♝`) && !tempSquare1.classList.contains(`black`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // Black Rook move
                if (square.innerText == `♜`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♜`) && testSquares(startX, startY, i, j, `♜`) && !tempSquare1.classList.contains(`black`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // Black Queen move
                if (square.innerText == `♛`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (canMove(x, y, `♛`) && testSquares(startX, startY, i, j, `♛`) && !tempSquare1.classList.contains(`black`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
                            }
                        }
                    }
                }
                // Black King move
                if (square.innerText == `♚`)
                {
                    var startX = parseInt(square.id.substring(0,1));
                    var startY = parseInt(square.id.substring(1,2));
                    for (i = 1; i < 9; i++)
                    {
                        for (j = 1; j < 9; j++)
                        {
                            var x = Math.abs(startX - i);
                            var y = Math.abs(startY - j);
                            var tempSquare1 = document.getElementById(`${i}${j}`);
                            if (((x == 1 && y == 1) || (x == 1 && y == 0) || (x == 0 && y == 1)) && !tempSquare1.classList.contains(`black`) && validMove(square, tempSquare1))
                            {
                                overlayDot(tempSquare1);
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
                overlayDot(         c8);
                        }
                        if (h8.innerText == `♜` && h8.classList.contains(`hasNotMoved`) && f8.innerText == `` && g8.innerText == ``)
                        {
                overlayDot(         g8);
                        }
                    }
                }
            }
        }
        // Makes move
        else
        {
            if (square != `` && whiteTurn) {takenBlackPieces += square.innerText; takenBlackPiecesDiv.innerText = takenBlackPieces;}
            if (square != `` && !whiteTurn) {takenWhitePieces += square.innerText; takenWhitePiecesDiv.innerText = takenWhitePieces;}
            oldClickWasNotMove = false;
            moved = true;
            // En passant
            if ((lastSquare.innerText == `♙` || lastSquare.innerText == `♟`) && square.innerText == `` && lastSquare.id.substring(0,1) != square.id.substring(0,1))
            {
                previousSquare.innerText = ``;
            }

            // Moves piece
            square.innerText = lastSquare.innerText;
            lastSquare.innerText = ``;
            calcMaterialAdvantage();

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
                openWhiteForm();
            }
            // Black pawn promotion
            if ( square.innerText == `♟` && square.id.substring(1,2) == `1`)
            {
                openBlackForm();
            }

            // Variable/class updates
            if (moved)
            {
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
                if (lastSquare.classList.contains(`whiteKing`))
                {
                    lastSquare.classList.remove(`whiteKing`);
                    square.classList.add(`whiteKing`);
                }
                if (lastSquare.classList.contains(`blackKing`))
                {
                    lastSquare.classList.remove(`blackKing`);
                    square.classList.add(`blackKing`);
                }
            previousLastSquare = lastSquare;
            previousSquare = square;
            }
            resetBoardColor();
            if (notTest && !promotion)
            {
                if (whiteTurn) checkForWin(true);
                else checkForWin(false);
            }
        }
    }
});

// Board resets
const resetBoardColor = () =>
{
    for (i = 1; i < 9; i++)
    {
        for (j = 1; j < 9; j++)
        {
            if ((i + j) % 2 == 0)
            {
                document.getElementById(`${i}${j}`).style.backgroundColor = `#036b0c56`;
            }
            else
            {
                document.getElementById(`${i}${j}`).style.backgroundColor = `#eee`;
            }
        }
    }
    removeOverlayDots();
}
function resetBoard(newGame)
{
    for (var i = 1; i < 9; i++)
    {
        for (var j = 1; j < 9; j++)
        {
            var resetSquare = document.getElementById(`${i}${j}`);
            resetSquare.innerText = ``;
            resetSquare.removeAttribute("class");
            if (j == 1)
            {
                if (i == 1 || i == 8) 
                {
                    resetSquare.innerText = `♖`;
                    resetSquare.classList.add(`white`, `hasNotMoved`);
                }
                if (i == 2 || i == 7) 
                {
                    resetSquare.innerText = `♘`;
                    resetSquare.classList.add(`white`);
                }
                if (i == 3 || i == 6) 
                {
                    resetSquare.innerText = `♗`;
                    resetSquare.classList.add(`white`);
                }
                if (i == 4) 
                {
                    resetSquare.innerText = `♕`;
                    resetSquare.classList.add(`white`);
                }
                if (i == 5) 
                {
                    resetSquare.innerText = `♔`;
                    resetSquare.classList.add(`white`, `hasNotMoved`, `whiteKing`);
                }
            }
            if (j == 2) 
            {
                resetSquare.innerText = `♙`;
                resetSquare.classList.add(`white`);
            }
            if (j == 8)
            {
                if (i == 1 || i == 8) 
                {
                    resetSquare.innerText = `♜`;
                    resetSquare.classList.add(`black`, `hasNotMoved`);
                }
                if (i == 2 || i == 7) 
                {
                    resetSquare.innerText = `♞`;
                    resetSquare.classList.add(`black`);
                }
                if (i == 3 || i == 6) 
                {
                    resetSquare.innerText = `♝`;
                    resetSquare.classList.add(`black`);
                }
                if (i == 4) 
                {
                    resetSquare.innerText = `♛`;
                    resetSquare.classList.add(`black`);
                }
                if (i == 5) 
                {
                    resetSquare.innerText = `♚`;
                    resetSquare.classList.add(`black`, `hasNotMoved`, `blackKing`);
                }
            }
            if (j == 7) 
            {
                resetSquare.innerText = `♟`;
                resetSquare.classList.add(`black`);
            }
        }
    }
    whiteTurn = true;
    whiteTime = 120;
    blackTime = 120;
    previousSquare = null;
    previousLastSquare = null;
    lastSquare = null;
    takenPieces = [];
    promotion = false;
    notTest = true;
    dotTest = false;
    oldClickWasNotMove = true;
    closeForm();
    gameOverDiv.style.display = `none`;
    gameOver = false;
    takenWhitePiecesDiv.innerText = ``;
    takenBlackPiecesDiv.innerText = ``;
    takenWhitePieces = ``;
    takenBlackPieces = ``;
    if (newGame)
    {
        p1Name = `White`;
        p2Name = `Black`;
        document.getElementById(`player1Name`).innerText = p1Name;
        document.getElementById(`player2Name`).innerText = p2Name;
        nameFormShow();
    }
}

// Overlay Dots
function overlayDot(square) 
{
    boardRect = board.getBoundingClientRect();
    rect = square.getBoundingClientRect();
    boardX = boardRect.left;
    boardY = boardRect.top;
    centerX = rect.left - boardX;
    centerY = rect.top - boardY;
    const div = document.createElement(`div`);
    div.innerText = `•`;
    div.classList.add(`overlayDot`);
    div.style.left = `${centerX}px`;
    div.style.top = `${centerY}px`;
    document.querySelector(`.chess-board`).appendChild(div);
    dotTest = true;
}
function removeOverlayDots()
{
    const divList = document.getElementsByClassName(`overlayDot`);
    while (divList.length != 0)
    {
        for(const div of divList)
        {
            div.remove();
        }
    }
}
function testForDot(square)
{
    rect = square.getBoundingClientRect();
    boardX = boardRect.left;
    boardY = boardRect.top;
    centerX = rect.left - boardX;
    centerY = rect.top - boardY;
    const divList = document.getElementsByClassName(`overlayDot`);
    for(const div of divList)
    {
        var test1 = Math.floor(parseInt(div.style.left.substring(0,6)))  == Math.floor(centerX);
        var test2 = Math.floor(parseInt(div.style.top.substring(0,6))) == Math.floor(centerY);
        if (test1 && test2) return true;
    }
    return false;
}

// Piece Move Logic
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
    return ((absX / absY == 1 && (piece == `♗` || piece == `♝` || piece == `♛` || piece == `♕`)) ||  ((absX > 0 && absY == 0 || absX == 0 && absY > 0) && (piece == `♜` || piece == `♖` || piece == `♕` || piece == `♛`)))
}
function promotePiece(piece)
{
    if (document.getElementsByClassName(`btn`)[0].style.color == `white`)
    {
        if (piece == `♛`) piece = `♕`;
        else if (piece == `♜`) piece = `♖`;
        else if (piece == `♝`) piece = `♗`;
        else piece = `♘`;
    }
    square.innerText = piece;
    
    closeForm();
    promotion = false;
}

// Check and Game Over Logic
function testCheck(isWhite)
{
    let KingSquare;
    if (isWhite) KingSquare = document.querySelector(`.whiteKing`);
    else KingSquare = document.querySelector(`.blackKing`);
    
    var startX = parseInt(KingSquare.id.substring(0,1));
    var startY = parseInt(KingSquare.id.substring(1,2));
    for (var x = 1; x < 9; x++)
    {
        for (var y = 1; y < 9; y++)
        {
            var absX = Math.abs(startX - x);
            var absY = Math.abs(startY - y);
            var piece = document.getElementById(`${x}${y}`).innerText;
            if (isWhite)
            {
                if (piece != `♕` && piece != `♖` && piece != `♗` && canMove(absX, absY, piece) && testSquares(x, y, startX, startY, piece))
                {
                    return true;
                }
                if (absY != 0 && absX / absY == 2 && piece == `♞`) return true;
                if (startX + 1 == x && startY + 1 == y && piece == `♟`) return true;
                if (startX - 1 == x && startY + 1 == y && piece == `♟`) return true;
                if (((absX == 1 && (absY == 1 || absY == 0)) || (absY == 1 && (absX == 1 || absX == 0))) && piece == `♚`) return true;
            }
            else
            {
                if (piece != `♛` && piece != `♜` && piece != `♝` && canMove(absX, absY, piece) && testSquares(x, y, startX, startY, piece))
                {
                    return true;
                }
                if (absY != 0 && absX / absY == 2 && piece == `♘`) return true;
                if (startX + 1 == x && startY - 1 == y && piece == `♙`) return true;
                if (startX - 1 == x && startY - 1 == y && piece == `♙`) return true;
                if (((absX == 1 && (absY == 1 || absY == 0)) || (absY == 1 && (absX == 1 || absX == 0))) && piece == `♔`) return true;
            }
        }
    }
    return false;
}
function validMove(startSquare, endSquare)
{
    var bool = true;
    var tempText = endSquare.innerText;
    endSquare.innerText = startSquare.innerText;
    startSquare.innerText = ``;
    if (startSquare.classList.contains(`whiteKing`))
    {
        startSquare.classList.remove(`whiteKing`);
        endSquare.classList.add(`whiteKing`);
    }
    if (startSquare.classList.contains(`blackKing`))
    {
        startSquare.classList.remove(`blackKing`);
        endSquare.classList.add(`blackKing`);
    }
    if (testCheck(true) && whiteTurn)
    {
        bool = false
    }
    if (testCheck(false) && !whiteTurn)
    {
        bool = false
    }
    startSquare.innerText = endSquare.innerText;
    endSquare.innerText = tempText;
    if (endSquare.classList.contains(`whiteKing`))
    {
        endSquare.classList.remove(`whiteKing`);
        startSquare.classList.add(`whiteKing`);
    }
    if (endSquare.classList.contains(`blackKing`))
    {
        endSquare.classList.remove(`blackKing`);
        startSquare.classList.add(`blackKing`);
    }
    return bool;
}
function checkForWin(isWhite)
{
    var oldSquare = square;
    var isNoValidMove = true;
    if (isWhite) var temp = `white`;
    else var temp = `black`;
    notTest = false;
    for (var i = 1; i < 9; i++)
    {
        for (var j = 1; j < 9; j++)
        {
            var tempSquare = document.getElementById(`${i}${j}`);
            if (tempSquare.classList.contains(temp))
            {
                tempSquare.click();
                if (dotTest) isNoValidMove = false;
            }
        }
    }
    square = oldSquare;
    if (oldClickWasNotMove) square.click();
    else removeOverlayDots();
    notTest = true;
    if (isNoValidMove && testCheck(isWhite)) 
    {
        showGameOver(!isWhite, false);
    }
    else if (isNoValidMove)
    {
        showGameOver(true, true);
    }
}

// Clocks
const whiteClock = document.getElementById(`whiteClock`);
const blackClock = document.getElementById(`blackClock`);
let whiteTime = 120;
let blackTime = 120;
let temp;
const whiteTimer = setInterval(() => {
    if (whiteTime != 0)
    {
        if (whiteTime % 60 < 10) temp = 0;
        else temp = ``;
        whiteClock.innerText = ` ` + Math.floor(whiteTime / 60) + `:` + temp + whiteTime % 60;
        if (whiteTurn && !gameOver && !nameFormOpen && !timeFormOpen) whiteTime--;
    }
    else 
    {
        whiteClock.innerText = ` TIME IS UP`;
        showGameOver(false);
    }
}, 1000);
const blackTimer = setInterval(() => {
    if (blackTime != 0)
    {
        if (blackTime % 60 < 10) temp = 0;
        else temp = ``;
        blackClock.innerText = ` ` + Math.floor(blackTime / 60) + `:` + temp + blackTime % 60;
        if (!whiteTurn && !gameOver && !nameFormOpen && !timeFormOpen) blackTime--;
    }
    else 
    {
        blackClock.innerText = ` TIME IS UP`;
        showGameOver(true);
    }
}, 1000);

// Forms
function openWhiteForm()
{
   promotion = true;
   document.getElementById("popupForm").style.display = "block";
   for (const btn of document.getElementsByClassName(`btn`))
   {
    btn.style.color = `white`;
   }
}
function openBlackForm()
{
   promotion = true;
   document.getElementById("popupForm").style.display = "block";
   for (const btn of document.getElementsByClassName(`btn`))
   {
    btn.style.color = `black`;
   }

}
function closeForm()
{
   document.getElementById("popupForm").style.display = "none";
}
function nameFormShow()
{
    document.getElementById(`namePopupDiv`).style.display = `block`;
    nameFormOpen = true;
}
function nameFormSubmit()
{
    document.getElementById(`namePopupDiv`).style.display = `none`;
    p1Name = document.getElementById(`name1Input`).value || `White`;
    p2Name = document.getElementById(`name2Input`).value || `Black`;
    document.getElementById(`player1Name`).innerText = p1Name;
    document.getElementById(`player2Name`).innerText = p2Name;
    nameFormOpen = false;
}
function timeFormShow()
{
    document.getElementById(`timePopupDiv`).style.display = `block`;
    timeFormOpen = true;
}
function timeFormSubmit()
{
    document.getElementById(`timePopupDiv`).style.display = `none`;
    whiteTime = document.getElementById(`time1Input`).value || 120;
    blackTime = document.getElementById(`time2Input`).value || 120;
    timeFormOpen = false;
}
function showGameOver(whiteWon, draw)
{
    gameOver = true;
    if (whiteWon) document.getElementById(`gameOverPopupText`).innerText = `Game Over, ${p1Name} Won!`;
    else document.getElementById(`gameOverPopupText`).innerText = `Game Over, ${p2Name} Won!`;
    if (draw) document.getElementById(`gameOverPopupText`).innerText = `Game Over, Draw!`;
    gameOverDiv.style.display = `block`;
}
function calcMaterialAdvantage()
{
    var whiteMat = 0;
    var blackMat = 0;
    for (var i = 1; i < 9; i++)
    {
        for (var j = 1; j < 9; j++)
        {
            var piece = document.getElementById(`${i}${j}`).innerText
            if (piece == `♕`) whiteMat += 8;
            else if (piece == `♖`) whiteMat += 5;
            else if (piece == `♗`) whiteMat += 3;
            else if (piece == `♘`) whiteMat += 3;
            else if (piece == `♙`) whiteMat += 1;
            else if (piece == `♛`) blackMat += 8;
            else if (piece == `♜`) blackMat += 5;
            else if (piece == `♝`) blackMat += 3;
            else if (piece == `♞`) blackMat += 3;
            else if (piece == `♟`) blackMat += 1;
        }
    }
    var matDiff = whiteMat - blackMat;
    if (matDiff > 0) 
    {
        takenWhitePiecesDiv.innerText = takenWhitePieces;
        takenBlackPiecesDiv.innerText = takenBlackPieces + ` +` + matDiff;
    }
    else if (matDiff < 0) 
    {
        takenWhitePiecesDiv.innerText = takenWhitePieces + ` +` + Math.abs(matDiff);
        takenBlackPiecesDiv.innerText = takenBlackPieces;
    }
    else 
    {
        takenBlackPiecesDiv.innerText = takenBlackPieces; takenWhitePiecesDiv.innerText = takenWhitePieces;
    }
}