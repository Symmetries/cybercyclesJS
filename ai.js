var APP = APP || {};

APP.ai = {};

APP.ai.nextMove = function(xs, ys, player, board){
    var moves = [];
    var posX = xs[player];
    var posY = ys[player];
    var areas = [];
    console.log("xs, ys");
    console.log(xs);
    console.log(ys);
    if (APP.ai.isPossible(posX, posY - 1, board)){
        moves.push("u");
        // var tot = 0;
        // for (var i = 0; i < xs.length; i++){
        //     if (i === player) {
        //         tot += APP.ai.calculateArea(posX, posY-1, board);
        //     } else
        //         tot -= APP.ai.calculateArea(xs[i], ys[i], board);
        //         console.log("specific");
        //         console.log(xs[i]);
        //         console.log(ys[i]);
        // }
        // console.log("testu");
        // console.log(tot);
        // areas.push(tot);
        areas.push(APP.ai.calculateArea(posX, posY-1, board));
    }
    if (APP.ai.isPossible(posX, posY + 1, board)){
        moves.push("d");
        // for (var i = 0; i < xs.length; i++){
        //     if (i === player) {
        //         tot += APP.ai.calculateArea(posX, posY+1, board);
        //     } else
        //         tot -= APP.ai.calculateArea(xs[i], ys[i], board);
        //         console.log("specific");
        //         console.log(xs[i]);
        //         console.log(ys[i]);
        // }
        // areas.push(tot);
        // console.log("testd");
        // console.log(tot);
        areas.push(APP.ai.calculateArea(posX, posY+1, board));
    }
    if (APP.ai.isPossible(posX - 1, posY, board)){
        moves.push("l");
        // for (var i = 0; i < xs.length; i++){
        //     if (i === player) {
        //         tot += APP.ai.calculateArea(posX -1, posY, board);
        //     } else
        //         tot -= APP.ai.calculateArea(xs[i], ys[i], board);
        //         console.log("specific");
        //         console.log(xs[i]);
        //         console.log(ys[i]);
        // }
        // areas.push(tot);
        // console.log("l");
        // console.log(tot);
        areas.push(APP.ai.calculateArea(posX-1, posY, board));
    }
    
    if (APP.ai.isPossible(posX + 1, posY, board)){
        moves.push("r");
        // for (var i = 0; i < xs.length; i++){
        //     if (i === player) {
        //         tot += APP.ai.calculateArea(posX+1, posY, board);
        //     } else
        //         tot -= APP.ai.calculateArea(xs[i], ys[i], board);
        // }
        // areas.push(tot);
        areas.push(APP.ai.calculateArea(posX+1, posY, board));
    }
    if (moves.length > 0){
        var maxArea = -board.length * board[0].length;
        console.log("max area");
        console.log(maxArea);
        for (var i = 0; i < moves.length; i++){
            if (areas[i] > maxArea){
                maxArea = areas[i];
            }
        }
        var goodMoves = [];
        for (var i = 0; i < moves.length; i++){
            if (areas[i] === maxArea){
                goodMoves.push(moves[i]);
            }
        }
        console.log("test");
        // console.log(player);
        console.log(board[posX][posY]);
        console.log(moves);
        console.log(areas);
        console.log(goodMoves);
        // console.log(goodMoves);
        var choice = Math.floor(Math.random() * goodMoves.length);
        console.log(goodMoves[choice]);
        return goodMoves[choice];
    }
    return ["u","d","l","r"][Math.floor(Math.random() * 4)];
};

APP.ai.calculateArea = function(x, y, board){
    var spaces = [];
    var positions = [];
    for (var i = 0; i < board.length; i++){
        spaces.push([]);
        for (var j = 0; j < board[0].length; j++){
            spaces[i].push(!APP.ai.isPossible(i, j, board) || (x === i && y === j));
        }
    }
    var posX = x;
    var posY = y;
    var done = false;
    var area = 0;
    var currentIndex = 0;
    while (!done){
        //up
        //console.log("check this:");
        //console.log(APP.ai.isPossible(x, y, board));
        if (APP.ai.isPossible(posX, posY-1, board) && !spaces[posX][posY-1]){
            area++;
            spaces[posX][posY-1] = true;
            positions.push([posX, posY-1]);
        } 
        // is down is possible
        if (APP.ai.isPossible(posX, posY + 1, board) && !spaces[posX][posY+1]){
            area++;
            spaces[posX][posY+1] = true;
            positions.push([posX, posY + 1]);
        }
        //if left is possible
        if (APP.ai.isPossible(posX - 1, posY, board) && !spaces[posX-1][posY]){
            area++;
            spaces[posX-1][posY] = true;
            positions.push([posX-1, posY]);
        }
        // is right possible
        if (APP.ai.isPossible(posX + 1, posY, board) && !spaces[posX+1][posY]){
            area++;
            spaces[posX+1][posY] = true;
            positions.push([posX+1, posY]);
        }
        //console.log(positions);
        if (currentIndex > area - 1 ||
            area > board.length*board[0].length/2){
            done = true;
        } else {
            posX = positions[currentIndex][0];
            posY = positions[currentIndex][1];
            currentIndex++;
        }
    }
    return area;
};

APP.ai.isPossible = function(x, y, board){
    return !board[x][y];
};