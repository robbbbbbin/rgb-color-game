var colorSquare = document.querySelectorAll(".colorSquare");
var resetBtn = document.querySelector("#resetBtn");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var rgbDisplay = document.querySelector("#rgbDisplay");
var infoDisplay = document.querySelector("#infoDisplay");
var streakScore = document.querySelector("#streakScore");
var para = document.querySelector("p");
var streakScoreNum = 0;
var colorArray = [];
var winningColor;
var hardModeNum = 6;
var easyModeNum = 3;
var hardMode = true;

init();

function init() {
    reset(hardModeNum);

    for(var i = 0; i < colorSquare.length; i++){
        colorSquare[i].addEventListener("click", function(){
            if(this.style.backgroundColor === winningColor){
                infoDisplay.textContent = "Correct!"
                para.classList.remove("streakBroken");
                para.classList.add("streakIncrease");
                streakScore.textContent = "Streak: " + (streakScoreNum +=1);
                winner(winningColor);
            } else {
                if(streakScoreNum > 0){
                    streakBroken("Streak broken, try again?");
                } else {
                    streakBroken("Try again?");
                }
            }
        });
    }

    resetBtn.addEventListener("click", function(){
        if(hardMode){
            reset(hardModeNum);
        } else {
            reset(easyModeNum)
        }
    });

    hardBtn.addEventListener("click", function(){
        hardBtn.classList.add("buttonSelected");
        easyBtn.classList.remove("buttonSelected");
        hardMode = true;
        for(var i = 0; i < hardModeNum; i++){
            colorSquare[i].style.display = "block";
        }
        reset(hardModeNum);
        streakBroken("Streak broken");
    });

    easyBtn.addEventListener("click", function(){
        easyBtn.classList.add("buttonSelected");
        hardBtn.classList.remove("buttonSelected");
        hardMode = false;
        for(var i = easyModeNum; i < hardModeNum; i++){
            colorSquare[i].style.display = "none";
        }
        reset(easyModeNum);
        streakBroken("Streak broken");
    });
}

function generateRandomRgb() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + red + ", " + blue + ", " + green + ")"
    return rgb;
}

function assignRandomColorToSquare(arr) {
    for(var i = 0; i < colorSquare.length; i++){
        colorSquare[i].style.backgroundColor = arr[i];
    }
}

function generateRgbArr(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(generateRandomRgb());
    }
    return arr;
}

function pickWinningColor(arr){
    var winningIndex = Math.floor(Math.random() * arr.length);
    var winningColor = arr[winningIndex];
    return winningColor;
}

function winner(rgb){
    for(var i = 0; i < colorSquare.length; i++){
        colorSquare[i].style.backgroundColor = rgb;
    }
    para.classList.add("streakIncrease");
    if(hardMode){
        setTimeout(reset, 1000, hardModeNum);
    } else {
        setTimeout(reset, 1000, easyModeNum);
    }
}

function reset(numOfSquares){
    colorArray = generateRgbArr(numOfSquares);
    winningColor = pickWinningColor(colorArray);
    rgbDisplay.textContent = winningColor;
    infoDisplay.textContent = "";
    assignRandomColorToSquare(colorArray);
    para.classList.remove("streakIncrease");
    para.classList.remove("streakBroken");
}

function streakBroken(infoString){
    infoDisplay.textContent = infoString;
    streakScoreNum = 0;
    streakScore.textContent = "Streak: " + streakScoreNum
    para.classList.remove("streakIncrease");
    para.classList.add("streakBroken");
}