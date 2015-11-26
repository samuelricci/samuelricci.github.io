/*
 * Constructs an action that the AI player could make
 * @param pos [Number]: the cell position the AI would make its action in
 * make that action
 */
var AIAction = function(pos) {
    
    // public: the position on the baord that the action would put the letter on
    this.movePosition = pos;
    
    // public: the minimax value of the state that the action leads to when applied
    this.minimaxVal = 0;
    
    /*
     * public: applies the action to a state to get the next state
     * @param state [State]: the state to apply the action to
     * @return [State]: the next state
     */
    this.applyTo = function(state) {
        var next = new State(state);
        
        //put the letter on the board
        next.board[this.movePosition] = state.turn;
        
        if(state.turn === "O")
            next.oMovesCount++;
        
        next.advanceTurn();
        
        return next;
    }
};

/*
 * public static method that defines a rule for sorting AIAction in asending manner
 * @param firstAction [AIAction]: the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; // indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; // indicates that secondAction goes before firstAction
    else 
        return 0; // indicates a tie
}

/*
 * public static method that defines a rule for sorting AIAction in descending manner
 * @param firstAction [AIAction]: the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; // indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; // indicates that secondAction goes before secondAction
    else
        return 0; // indicates a tie
}

/*
 * Constructs an AI player with a specific level of intelligence
 * @param level [String]: the desired level of intelligence
 */

var AI = function (level) {
    
    //privat attribute: level of intelligence the player has
    var levelOfIntelligence = level;
    
    //privat attribute: the game the player is playing
    var game = {};
    
    /*
     * private recursive function that computes the minimax value of a game state
     * @param state [State]: the state to calculate its minimax value
     * @returns [Number]: the minimax value of the state
     */
    function minimaxValue(state) {
        if (state.isTerminal()) {
            // a terminal game state is the base case
            return Game.score(state);
        } else {
            var stateScore; // this stores the minimax value we'll compute
            
            if (state.turn === "X")
                // X maximizes --> initializes to a value smaller than any possible score
                stateScore = -1000;
            else
                // O minimizes --> initializes to a value larger than any possible score
                stateScore = 1000;
            
            var availablePositions = state.emptyCells();
            
            // enumerate next available states using the info from available positions
            var availableNextStates = availablePositions.map(function(pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                
                return nextState;
            });
            
            /*
             * Calculate the minimax value for all available next states and evaluate the current state's value
             */
            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState); // Recursive call
                
                if (state.turn === "X") {
                    // X wants to maximize --> update stateScore iff nextScore is larger
                    if (nextScore > stateScore)
                        stateScore = nextScore;
                } else {
                    // O wants to minimize --> update stateScore iff nextScore is smaller
                    if (nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            
            // Backup the minimax value
            return stateScore;
        }
    }
    
    /*
     * private function: make the AI player take a blind move
     * that is: choose the cell to place its symbol randomly
     * @param turn [String]: the player to play, either X or O
     */
    function takeABlindMove(turn) {
        var available = game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AIAction(randomCell);
        
        var next = action.applyTo(game.currentState);
        
        ui.insertAt(randomCell, turn);
        
        game.advanceTo(next);
    }
    
    /*
     * private function: make the AI player take a novice move
     * that is: mix between choosing the optimal and suboptimal minimax decisions
     * @param turn [String]: the player to play, either X or O
     */
    function takeANoviceMove(turn) {
        var available = game.currentState.emptyCells();
        
        // Enumerate adn calculate the score for each available actions to the AI player
        var availableActions = available.map(function(pos) {
            var action = new AIAction(pos); //create the action object
            
            // Get next state by applying the action
            var nextState = action.applyTo(game.currentState);
            
            // Calculate and set the action's minimax value
            action.minimaxVal = minimaxValue(nextState);
            
            return action;
        });
        
        // Sort the enumerated actions list by score
        if (turn === "X")
            // X maximizes --> decend sort the actions to have the maximum minimax at first
            availableActions.sort(AIAction.DESCENDING);
        else
            // O minimizes --> ascend sort the actions to have the minimum minimax at first
            availableActions.sort(AIAction.ASCENDING);
        
        /*
         * take the optimal action 40% of the time
         * take the 1st suboptimal action 60% of the time
         */
        var chosenAction;
        if (Math.random()*100 <= 40) {
            chosenAction = availableActions[0];
        } else {
            if (availableActions.length >= 2) {
                // If there is two or more available actions, choose the 1st suboptimal
                chosenAction = availableActions[1];
            } else {
                // Choose the only available actions
                chosenAction = availableActions[0];
            }
        }
        
        var next = chosenAction.applyTo(game.currentState);
        
        ui.insertAt(chosenAction.movePosition, turn);
        
        game.advanceTo(next);
    };
    
    /*
     * private function: make the AI player take a master move
     * that is: choose the optimal minimax decision
     * @param turn [String]: the player to play, either X or O
     */
    function takeAMasterMove(turn) {
        var available = game.currentState.emptyCells();
        
        // Enumerate and calculate the score for each available actions to the AI player
        var availableActions = available.map(function(pos) {
            var action = new AIAction(pos); // Create the action object
            
            // Get next state by applying the action
            var next = action.applyTo(game.currentState);
            
            return action;
        });
        
        // Sort the enumerated actions list by score
        if (turn === "X")
            // X maximizes --> descend sort the actions to have the largest minimax at first
            availableActions.sort(AIAction.DESCENDING);
        else
            // O minimizes --> ascend sort the actions to have the smallest minimax at first
            availabeActions.sort(AIAction.ASCENDING);
        
        // Take the first action as it's the optimal
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);
        
        // This just adds an X or an O at the chosen position on the board in the UI
        ui.insertAt(chosenAction.movePosition, turn);
        
        // Take the game to the next state
        game.advanceTo(next);
    }
    
    /*
     * public method to specify the game the AI player will play
     * @param _game [Game]: the game the AI will play
     */
    this.plays = function(_game) {
        game = _game;
    };
    
    /*
     * public function: notify the AI player that it's its turn
     * @param turn [String]: the player to play, either X or O
     */
    this.notify = function(turn) {
        switch(levelOfIntelligence) {
                //invoke the desired behavior based on the level chosen
            case "blind": takeABlindMove(turn); break;
            case "novice": takeANoviceMove(turn); break;
            case "master": takeAMasterMove(turn); break;
        }
    };
};