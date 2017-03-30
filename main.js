var APP = APP || {};

//For browser compatibility, define a requestAnimFram function
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();





APP.ctx = document.getElementById('canvas').getContext('2d'),
APP.boardWidth = 30;
APP.boardHeight = 30;
APP.currentGame = new APP.Game(
    [10, APP.boardWidth - 10 - 1],
    [10, APP.boardHeight - 10 - 1],
    ["d", "l"],
    APP.boardWidth,
    APP.boardHeight);


APP.mainLoop = function(){
    APP.ctx.canvas.width = window.window.innerWidth;
    APP.ctx.canvas.height = window.window.innerHeight;
    var nextMoves = [];
    nextMoves.push(APP.input.getArrowInputs());
    nextMoves.push(APP.ai.nextMove(
        APP.currentGame.xs, 
        APP.currentGame.ys,
        1, //player 1, because the first player is player 0
        APP.currentGame.board));
    APP.currentGame.update(nextMoves);
    APP.output.drawBackground(APP.ctx);
    APP.output.drawPixels(APP.ctx, APP.boardWidth, APP.boardHeight);
    APP.output.drawGame(APP.ctx, APP.currentGame.board);
    APP.input.resetInputs();
    if (APP.currentGame.isOver()){
        APP.currentGame = new APP.Game(
            [10, APP.boardWidth - 10 - 1],
            [10, APP.boardHeight - 10 - 1],
            ["d", "l"],
            APP.boardWidth,
            APP.boardHeight);
    }
    //window.requestAnimFrame(APP.mainLoop);
};

setInterval(APP.mainLoop, 100);