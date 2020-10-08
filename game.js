var level = 0;
var started = false;
var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red","blue","green","yellow"];

function nextSequence(){
  userClickedPattern=[];
  level++;
    $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

 $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour);
console.log(gamePattern);
};

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
userSequence=userClickedPattern.length;
playSound(userChosenColour);
animatePress(userChosenColour);
console.log(userClickedPattern);
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+'.mp3');
  audio.play();
};

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
};

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
   started = true;


  }
});
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);
}
  }
else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
          $("body").removeClass("game-over");
      }, 100);
      $("h1").text("Game Over, Press any key to Restart");
      startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started= false;
}
