var aiArray = ['rock', 'paper', 'scissors'];

var aiChoice = aiArray[Math.floor(Math.random()*3)];

$('#aiPick').html( aiChoice );

// Listen for user click and then compare with aiChoice and display answer
// depending on comparison logic

// $('pre').on('click', function(e) {
  // var playerChoose = e.target.id;
  // alert(playerChoose);
// });
