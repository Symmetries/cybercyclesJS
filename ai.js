var APP = APP || {};

APP.ai = {};

APP.ai.nextMove = function(xs, ys, player, board){
    var moves = [];
    
    if (!board[xs[player]][ys[player] - 1] && ys[player] > 0){
        moves.push("u");
    }
    if (!board[xs[player]][ys[player] + 1] && ys[player] < board[0].length - 1){
        moves.push("d");
    }
    if (!board[xs[player] - 1][ys[player]] && xs[player] > 0){
        moves.push("l");
    }
    if (!board[xs[player] + 1][ys[player]] && xs[player] < board.length - 1){
        moves.push("r");
    }
    if (moves.length > 0){
        console.log(moves);
        return moves[Math.floor(Math.random() * moves.length)];
    }
    return ["u","d","l","r"][Math.floor(Math.random() * 4)];
};