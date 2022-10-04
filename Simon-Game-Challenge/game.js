
//Game pattern and user clicked variables.
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userclickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//User click function.
$(".btn").click(function handler() {

  var userChosenColor = $(this).attr("id");

  userclickedPattern.push(userChosenColor);
  //Play sounds when clicked.
  playSound(userChosenColor);
  //Shadow effect.
  animatePress(userChosenColor);
  //Check checkAnswer
  checkAnswer(userclickedPattern.length - 1);
});

//Check if the clicked button is right.
function checkAnswer(currentLevel) {
  if (userclickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    if (userclickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Restart function.
function startOver() {
  //Reset all the values , i.e. restart the game.
  level = 0;
  gamePattern = [];
  started = false;
}

//Next sequence.
function nextSequence() {
  //reset userclicke array.
  userclickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  //Random number creation for color selection.
  n = Math.random();
  n = 4 * n - 1;
  randomNumber = Math.ceil(n);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //Button blinking
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //Adding Audio
  playSound(userChosenColor);

}

//Sound playing function.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Button Animation function.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}
