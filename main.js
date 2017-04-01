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
APP.boardWidth = 50;
APP.boardHeight = 50;
APP.currentGame = new APP.Game(
    [1, 1, APP.boardWidth - 1 - 1, APP.boardWidth - 1 - 1],
    [1, APP.boardHeight -1 - 1, APP.boardHeight - 1 - 1, 1],
    ["d", "r", "l", "l"],
    APP.boardWidth,
    APP.boardHeight);
APP.paused = false;

APP.ctx.canvas.width = window.window.innerWidth;
APP.ctx.canvas.height = window.window.innerHeight;
APP.output.drawBackground(APP.ctx);
APP.output.drawPixels(APP.ctx, APP.boardWidth, APP.boardHeight);
APP.output.drawGame(APP.ctx, APP.currentGame.board);

var fps = 10;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

APP.mainLoop = function(){
    window.requestAnimationFrame(APP.mainLoop);
    now = Date.now();
	delta = now - then;
	
	if(delta > interval){
        if (!APP.paused){
            var nextMoves = [];
            nextMoves.push(APP.input.getArrowInputs());
            nextMoves.push(APP.ai.nextMove(
                APP.currentGame.xs, 
                APP.currentGame.ys,
                1, //player 1, because the first player is player 0
                APP.currentGame.board));
            nextMoves.push(APP.ai.nextMove(
                APP.currentGame.xs, 
                APP.currentGame.ys,
                 2, //player 2, because the first player is player 0
                 APP.currentGame.board));
            nextMoves.push(APP.ai.nextMove(
                APP.currentGame.xs, 
                APP.currentGame.ys,
                 3, //player 3, because the first player is player 0
                 APP.currentGame.board));
            APP.currentGame.update(nextMoves);
        }
        if (APP.input.getSpace()){
            APP.paused = !APP.paused; 
        }
        APP.ctx.canvas.width = window.window.innerWidth;
        APP.ctx.canvas.height = window.window.innerHeight;
        APP.output.drawBackground(APP.ctx);
        APP.output.drawPixels(APP.ctx, APP.boardWidth, APP.boardHeight);
        APP.output.drawGame(APP.ctx, APP.currentGame.board);
        APP.input.resetInputs();
        if (APP.currentGame.isOver()){
            APP.currentGame = new APP.Game(
                [1, 1, APP.boardWidth - 1 - 1, APP.boardWidth - 1 - 1],
                [1, APP.boardHeight -1-1, APP.boardHeight - 1 - 1, 1],
                ["d", "l", "l", "r"],
                APP.boardWidth,
                APP.boardHeight);
            APP.ctx.canvas.width = window.window.innerWidth;
            APP.ctx.canvas.height = window.window.innerHeight;
            APP.output.drawBackground(APP.ctx);
            APP.output.drawPixels(APP.ctx, APP.boardWidth, APP.boardHeight);
            APP.output.drawGame(APP.ctx, APP.currentGame.board);
        }
        then = now - (delta % interval);
	}
};

APP.mainLoop();