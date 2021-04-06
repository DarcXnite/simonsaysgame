
let btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 1;
let newLevel = 0;

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");

    if (gameStart) {
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        if (gamePattern.length === userClickedPattern.length) {
            $(".btn").addClass("no-click");
        }

        checkAnswer(userClickedPattern.length - 1)
    } 
});

function checkAnswer(index) {
    if (gamePattern[index] === userClickedPattern[index]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSeq()
            }, 1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $(".btn").addClass("no-click");

        logHighestLevel();

        setTimeout(function () {
            $("body").removeClass("game-over");
            gameStart = false;
            gameReset();
        }, 200)
    }
}

function logHighestLevel() {
    if (newLevel < level) {
        newLevel = level - 2;
        $("#level-ender").text("Highest Level: " + newLevel)
    }

    return newLevel;
}

function gameReset() {
    let timer = 0;

    if (!gameStart) {
        userClickedPattern = [];
        gamePattern = [];
        level = 1;
        $("#level-title").text("Try Again!");
        setTimeout(function () {
            $(".row").addClass("hidden");
            $(".hide").removeClass("hidden");
        }, 500);
        setTimeout(function () {
            $("#level-title").text("Press Any Key or Push Start Button");
            removeClick(timer);
        }, 3000);
    }
}

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
};

function btnAnimate(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
};

function animatePress(currentColor) {
    let selectedBtn = $("." + currentColor);

    selectedBtn.addClass("pressed");
    setTimeout(function () {
        selectedBtn.removeClass("pressed")
    }, 100);
};

async function gamesTurn() {
    function gameSequence() {
        for (let i = 0; i < gamePattern.length; i++) {
            setTimeout(function () {
                btnAnimate(gamePattern[i]);
                playSound(gamePattern[i]);
            }, 500 * (i + 1))
        }
    }

    let reset = 500 * (gamePattern.length + 1);

    await gameSequence();
    removeClick(reset);
}

function removeClick(t) {
    setTimeout(function() {
        $(".btn").removeClass("no-click")
    }, t)
}

function nextSeq() {
    let rng = Math.floor((Math.random() * 4));
    let rngColors = btnColors[rng];

    userClickedPattern = [];
    gamePattern.push(rngColors);

    $("#level-title").text("Level " + level);

    $(".btn").addClass("no-click");

    gamesTurn();

    level++;
};

$(document).keydown(function(e) {
    if(!gameStart) {
        $(".row").removeClass("hidden");
        $(".hide").addClass("hidden");
        $("#level-ender").removeClass("hidden");
        nextSeq();
        gameStart = true;
    };
});

$(".start-btn").click(function(e) {
    if(!gameStart) {
        $(".row").removeClass("hidden");
        $(".hide").addClass("hidden");
        $("#level-ender").removeClass("hidden");
        nextSeq();
        gameStart = true;
    }
})