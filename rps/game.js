var aiArray = ['rock', 'paper', 'scissors'];
 
$("div").click(function() { //Add this listener to all div elements that, on click, will: ...
	var clickedID = $(this).attr('id'); //Get the id of the clicked div element.
	
	if (clickedID === "rock" || clickedID === "paper" || clickedID === "scissors") //If it is a rock, paper, or scissors div: call our newChoice method.
		newChoice(clickedID);
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

function newChoice (playerChoice) {
	var aiChoice = aiArray[Math.floor(Math.random()*3)];
	
	$('#aiPick').html(aiChoice);
	$('#compareResult').html( compare(playerChoice, aiChoice) ); //Set the compareResult html to the result of the comparison of the player's and AI's choices.
}
