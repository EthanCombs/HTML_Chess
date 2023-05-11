var player1Turn = true;
var isOver = false;
var draw = false;
const h3 = document.querySelector(`h3`);
const buttons = document.getElementsByTagName(`button`);
const p1Win = document.getElementById(`p1Win`);
const p2Win = document.getElementById(`p2Win`);
if (player1Turn) 
function check(btn)
{
    if (btn.innerText == `` && !isOver)
    {
        if (player1Turn)
        {
            h3.innerText = `Player2's Turn`;
            btn.innerText = `X`;
            player1Turn = false;
        }
        else
        {
            h3.innerText = `Player1's Turn`;
            btn.innerText = `O`;
            player1Turn = true;
        }
    }
    checkForWin();
}
function checkForWin()
{
    const buttonsText = [];
    for (btn of buttons) {
        buttonsText[buttonsText.length] = btn.innerText;
    }
    if (buttonsText[0] != `` && buttonsText[0] == buttonsText[1] && buttonsText[1] == buttonsText[2]) win();
    else if (buttonsText[3] != `` && buttonsText[3] == buttonsText[4] && buttonsText[4] == buttonsText[5]) win();
    else if (buttonsText[6] != `` && buttonsText[6] == buttonsText[7] && buttonsText[7] == buttonsText[8]) win();
    else if (buttonsText[0] != `` && buttonsText[0] == buttonsText[3] && buttonsText[3] == buttonsText[6]) win();
    else if (buttonsText[1] != `` && buttonsText[1] == buttonsText[4] && buttonsText[4] == buttonsText[7]) win();
    else if (buttonsText[2] != `` && buttonsText[2] == buttonsText[5] && buttonsText[8] == buttonsText[2]) win();
    else if (buttonsText[0] != `` && buttonsText[0] == buttonsText[4] && buttonsText[4] == buttonsText[8]) win();
    else if (buttonsText[2] != `` && buttonsText[2] == buttonsText[4] && buttonsText[4] == buttonsText[6]) win();
    else if (buttonsText.indexOf(``) == -1) {draw = true; win();}
}
function win() {
    isOver = true;
    if (draw) h3.innerText = `Draw`;
    else if (player1Turn) {h3.innerText = `Player2 Won`; p2Win.innerText++}
    else {h3.innerText = `Player1 Won`; p1Win.innerText++}
    draw = false;
    setTimeout(() => { reset(); }, 1000);
}
function reset() {
    for (btn of buttons) {
        btn.innerText = ``;
    }
    isOver = false;
    if (player1Turn) h3.innerText = `Player1's Turn`;
    else h3.innerText = `Player2's Turn`;
}