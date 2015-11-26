/*
 * ui object encloses all UI related methods and attributes
 */
var ui = {};

// holds the state of the initial controls visibility
ui.intialControlsVisible = true;

// holds the setInterval handle for the robot flickering
ui.robotFlickeringHandle = 0;

// holds the current visible view
ui.currentView = "";

/*
 * Starts the flickering effect of the robot image 
 */


/*
 * Switches the view on the UI depending on who's turn it is
 * @param turn [String]: the player to switch the view to 
 */
ui.switchViewTo = function(turn) {
    
    // Helper function for async calling
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");
        
        if (_turn === "ai")
            ui.startRobot
    }
}


/*
 * Places X or O in the specified place on the board
 * @param i [Number]: row number (0-indexed)
 * @param j [Number]: column number (0-indexed)
 * @param symbol [String]: X or O
 */

ui.insertAt = function(index, symbol) {
    var board = $('.cell');
    var targetCell = $(gameBoard[index]);
    
    if (!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color: symbol == "X" ? "green" : "red"
        });
        targetCell.addClass('occupied');
    }
}