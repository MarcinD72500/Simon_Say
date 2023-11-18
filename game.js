var values = [];
var buttonClicked = [];
var timeVar = 1500;

// Add Listener - Keyboard -> Executing function: Initiate
document.addEventListener("keydown", initiate);

function initiate(keyInserted) {
    var check = keyInserted.key;
    if (check === "a") {
        document.removeEventListener("keydown", initiate);
        levelPreparation();
    }
}
/////////////////////////////////////////////////////////////


// Add Listener - Button's reaction to Click    -> Executing:
//                                                          1) Click Handler: Button Highlight
//                                                          2) Game Manager : Game Mechanics
var buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var btnColor = this.id;
        clickHandler(btnColor);
        gameManager(btnColor, values, buttonClicked);
    });
}
function levelPreparation() {

    values.push(randomValue());
    setLevel(values.length);
    colorSequence();
    document.removeEventListener("keydown", levelPreparation);

    //console.log("Array: " + values);
    //console.log("Buttons: " + buttonClicked);

}

//PREPARATION////////////////////////////////////
function randomValue() {
    var value = Math.floor(Math.random() * 4);
    switch (value) {
        case 0:  // Green
            return "green";

        case 1: // Red
            return "red";

        case 2: // Yellow
            return "yellow";

        case 3: // Blue
            return "blue";

        default:
            // console.log("Button Highlight - Problem");
            break;
    }
}
function setLevel(i) {
    document.getElementById("level-title").innerHTML = "Level " + i;
}
function colorSequence() {

    var clock;

    for (let i = 0; i < values.length; i++) {
        clock = timeVar * (i + 1);
        // console.log("Clock: " + clock);
        setTimeout(function () {
            buttonHighlight(values[i]);
        }, clock);
    }
}
function buttonHighlight(color) {
    highlight(color);
}
function highlight(color) {
    document.getElementById(color).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(color).classList.remove("pressed");
    }, 100);
    (new Audio("./sounds/" + color + ".mp3")).play();
}

//MOUSE//////////////////////////////////////////
function clickHandler(btnColor) {
    highlight(btnColor);
}
function gameManager(btnColor, array, buttonClicked) {

    buttonClicked.push(btnColor);


    var iter = (buttonClicked.length) - 1;
    //console.log(iter);
    if ((array[iter]) === (buttonClicked[iter])) {
        //console.log((array[iter]));
        //console.log((buttonClicked[iter]));
        // console.log("Return 0");

        if (array.length === buttonClicked.length) {
            // console.log("Equeal");
            zeroing(buttonClicked);
            levelPreparation();

            // console.log("Correct - Array: " + array);
            // console.log("Correct - Buttons: " + buttonClicked);
        }
    }
    else {
        zeroing(buttonClicked);
        error();
    }

}
function chechCorrectness(array, buttonClicked) {
    // console.log("Array: " + array);
    // console.log("Buttons: " + buttonClicked);

    // iter : Current position in MAIN TABLE while checking button of sequence; 
    var iter = (buttonClicked.length) - 1;
    if ((array[iter]) === (buttonClicked[iter])) {
        //console.log((array[iter]));
        //console.log((buttonClicked[iter]));
        // console.log("Return 0");
        if (array.length === buttonClicked.length) {
            return true;
        }
    }
    else {
        return false;
    }
}
function error() {

    // Set - Action Listener
    document.addEventListener("keydown", levelPreparation);

    // Set - Title
    document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";

    // Set - Red Background Animation
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
    }, 100);

    // Set - Audio
    (new Audio("./sounds/wrong.mp3")).play();

    //Cleaning - Main Table
    for (let i = values.length; i > 0; i--) {
        values.pop();
    };

    // Control
    // console.log("Return 1");
}
function zeroing(buttonClicked) {
    for (let i = buttonClicked.length; i > 0; i--) {
        buttonClicked.pop();
    }

}
//////////////////////////////////////////////////////
