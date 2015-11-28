/*
 * Object to contain all items accessable to all control functions
 */
var globals = {};

/*
 * Choosing difficulty level (onclick span.level) behavior and control
 * When a level is clicked, it becomes highlighted and the "ai.level" variable is set to the
 * chosen level
 */
$(".level").each(function() {
    var $this = $(this);
    $this.click(function() {
        $(".selected").toggleClass("not-selected");
        $(".selected").toggleClass("selected");
        $this.toggleClass("not-selected");
        $this.toggleClass("selected");
        
        ai.level = $this.attr("id");
    });
});

/*
 * Start game (onclick div.begin) behavior and control
 * When start is clicked and a level is chosen, the game status changes to "running"
 * UI view switches to indicate that it is the humans turn to play.
 */
$(".begin").click(function() {
    var selectedDifficulty = $(".selected").attr("id");
    if(typeof selectedDifficulty !== "undefined") {
        var aiPlayer = new AI(selectedDifficulty);
        globals.game = new Game(aiPlayer);
        
        aiPlayer.plays(globals.game);
        
        globals.game.start();
    }
});

/* 
 * Click on cell (onclick div.cell) behavior and control
 * If an empty cell is clicked when the game is running and its the human player's turn
 * get the indecies of the clicked cell, create the next game state, update the UI and 
 * advance the game to the new created state
 */
$(".cell").each(function() {
    var $this = $(this);
    $this.click(function() {
        if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
            var indx = parseInt($this.data("indx"));
            
            var next = new State(globals.game.currentState);
            next.board[indx] = "X";
            
            ui.insertAt(indx, "X");
            
            next.advanceTurn();
            
            globals.game.advanceTo(next);
        }
    })
});