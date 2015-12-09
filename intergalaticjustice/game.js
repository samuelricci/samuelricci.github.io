var aiArray = ['rock', 'paper', 'scissors'];

var aiChoice = aiArray[Math.floor(Math.random()*3)];

$('#aiPick').html(aiChoice);

// Listen for user click and then compare with aiChoice and display answer
// depending on comparison logic
var playerChoice = humanPick;

$('pre').on('click', function(e) {
  var humanPick = e.target.id;
  alert ( humanPick );
}); 


function compare (playerChoice, aiChoice) {
  
  var result = "";
  
  if (playerChoice === aiChoice) {
    result = "tie";
  }
  
  if (playerChoice === 'rock' && aiChoice === 'scissors' || playerChoice === 'paper' && aiChoice === 'rock' || playerChoice === 'scissors' && aiChoice === 'paper') {
    result = "win";
  }
  
  if (playerChoice === 'rock' && aiChoice === 'paper' || playerChoice === 'paper' && aiChoice === 'scissors' || playerChoice === 'scissors' && aiChoice === 'rock') {
    result = "lose";
  }
  return (result);
}



$('#compareResult').html(endResult);
