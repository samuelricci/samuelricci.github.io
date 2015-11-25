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
    function minimaxValue(state) {...}
    
    /*
     * private function: make the AI player take a blind move
     * that is: choose the cell to place its symbol randomly
     * @param turn [String]: the player to play, either X or O
     */
    function takeABlindMove(turn) {...}
    
    /*
     * private function: make the AI player take a novice move
     * that is: mix between choosing the optimal and suboptimal minimax decisions
     * @param turn [String]: the player to play, either X or O
     */
    function takeANoviceMove(turn) {...}
    
    /*
     * private function: make the AI player take a master move
     * that is: choose the optimal minimax decision
     * @param turn [String]: the player to play, either X or O
     */
    function takeAMasterMove(turn) {...}
    
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