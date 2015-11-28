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
ui.startRobotFlickering = function() {
    ui.robotFlickeringHandle = setInterval(function() {
        $("#robot").toggleClass("robot");
    }, 500);
};

/*
 * Stops the flickering effect on the robot image
 */
ui.startRobotFlickering = function() {
    clearInterval(ui.robotFlickeringHandle);
};

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
    
    if(ui.initialControlsVisible) {
        // If the game is just starting
        ui.intialControlsVisible = false;
        
        $('.initial').fadeOut({
            duration: "slow",
            done: function() {
                _switch(turn);
            }
        });
    } else {
        // If the game is in an intermediate state
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};


/*
 * Places X or O in the specified place on the board
 * @param i [Number]: row number (0-indexed)
 * @param j [Number]: column number (0-indexed)
 * @param symbol [String]: X or O
 */

ui.insertAt = function(indx, symbol) {
    var gameBoard = $('.cell');
    var targetCell = $(gameBoard[indx]);
    
    if (!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color: symbol == "X" ? "green" : "red"
        });
        targetCell.addClass('occupied');
    }
}