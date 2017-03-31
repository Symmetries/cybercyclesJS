var APP = APP || {};

APP.output = {};

APP.output.drawBackground = function(ctx) {
	ctx.beginPath();
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "#808080";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	//ctx.rect(myGame.borderx, myGame.bordery, width - 2 * myGame.borderx, height - 2 * myGame.bordery);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
};


APP.output.setPixel = function (ctx, x, y, boardWidth, boardHeight, color) {
    var gameWidth;
    var gameHeight;
    var side;
    var border;
    if (ctx.canvas.width * boardHeight > ctx.canvas.height * boardWidth){
        gameHeight = ctx.canvas.height;
        gameWidth = boardWidth * ctx.canvas.height / boardHeight;
        side = gameHeight/boardHeight;
        border = side/5;
        ctx.beginPath();
        ctx.rect(
            (ctx.canvas.width - gameWidth)/2 + x * side + border/2,
            y * side +  border/2,
            side - border,
            side - border);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    } else {
        gameWidth = ctx.canvas.width;
        gameHeight = boardHeight * ctx.canvas.width / boardWidth;
        side = gameHeight/boardHeight;
        border = side/5;
        ctx.beginPath();
        ctx.rect(
            x * side + border/2,
            (ctx.canvas.height - gameHeight)/2 + y * side +  border/2,
            side - border,
            side - border);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
// 	ctx.beginPath();
// 	//ctx.rect(myGame.borderx + myGame.side * x + myGame.grid_width, myGame.bordery + myGame.side * y + myGame.grid_width ,myGame.side - 2 * myGame.grid_width, myGame.side - 2 * myGame.grid_width);
// 	ctx.fillStyle = color;
// 	ctx.fill();
// 	ctx.closePath();
};

APP.output.drawPixels = function(ctx, boardWidth, boardHeight) {
	for (var i = 0; i < boardWidth; i++ ) {
		for (var j = 0; j < boardHeight; j++) {
			APP.output.setPixel(ctx, i, j, boardWidth, boardHeight, "#DDDDDD");
		}
	}
};

APP.output.drawGame = function(ctx, board){
    for(var x = 0; x < board.length; x++){
        for(var y = 0; y < board[x].length; y++){
            if (board[x][y]){
                APP.output.setPixel(ctx, x, y,
                    board.length, board[0].length, "black");
            }
        }
    }
};