var APP = APP || {};

APP.ai = {};

APP.ai.nextMove = function(xs, ys, player, board){
    var moves = [];
    var posX = xs[player];
    var posY = ys[player];
    var areas = [];
    var tot;
    var movesAhead = 2;
    //console.log("Player :" + player);
    if (APP.ai.isPossible(posX, posY - 1, board)){
        moves.push("u");
        tot = 0;
        for (var i = 0; i < xs.length; i++){
            if (i === player) {
                tot += APP.ai.calculateAreaR(posX, posY-1, board, movesAhead);
            } else
                tot -= 3 * APP.ai.calculateArea(xs[i], ys[i], board);
        }
        // console.log("test: u");
        // console.log(tot);
        areas.push(tot);
        //areas.push(APP.ai.calculateArea(posX, posY-1, board));
    }
    if (APP.ai.isPossible(posX, posY + 1, board)){
        moves.push("d");
        tot = 0;
        for (var i = 0; i < xs.length; i++){
            if (i === player) {
                tot += APP.ai.calculateAreaR(posX, posY+1, board, movesAhead);
            } else
                tot -= 3 *  APP.ai.calculateArea(xs[i], ys[i], board);
        }
        areas.push(tot);
        // console.log("test: d");
        // console.log(tot);
        //areas.push(APP.ai.calculateArea(posX, posY+1, board));
    }
    if (APP.ai.isPossible(posX - 1, posY, board)){
        moves.push("l");
        tot = 0;
        for (var i = 0; i < xs.length; i++){
            if (i === player) {
                tot += APP.ai.calculateAreaR(posX -1, posY, board, movesAhead);
            } else
                tot -= 3 * APP.ai.calculateArea(xs[i], ys[i], board);
        }
        areas.push(tot);
        // console.log("l");
        // console.log(tot);
        //areas.push(APP.ai.calculateArea(posX-1, posY, board));
    }
    
    if (APP.ai.isPossible(posX + 1, posY, board)){
        moves.push("r");
        tot = 0;
        for (var i = 0; i < xs.length; i++){
            if (i === player) {
                tot += APP.ai.calculateAreaR(posX+1, posY, board, movesAhead);
            } else
                tot -= 3 * APP.ai.calculateArea(xs[i], ys[i], board);
        }
        areas.push(tot);
        //areas.push(APP.ai.calculateArea(posX+1, posY, board));
    }
    if (moves.length > 0){
        var maxArea = -8 * board.length * board[0].length;
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
        var choice = Math.floor(Math.random() * goodMoves.length);
        //console.log(goodMoves[choice]);
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
        if (currentIndex > area - 1){ //||
           // area > board.length*board[0].length/2){
            done = true;
        } else {
            posX = positions[currentIndex][0];
            posY = positions[currentIndex][1];
            currentIndex++;
        }
    }
    return area;
};

APP.ai.calculateAreaR = function(mex, mey, board, level){
    var area = -1;
    var maxArea = -board.length * board[0].length;
    if (level === 1){
        if (!board[mex][mey]){
            board[mex][mey] = true;
            //up -y
            if (APP.ai.isPossible(mex, mey - 1, board)){
                area = APP.ai.calculateArea(mex, mey-1, board);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            // down +y
            if (APP.ai.isPossible(mex, mey + 1, board)){
                area = APP.ai.calculateArea(mex, mey+1, board);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            // left -x
            if (APP.ai.isPossible(mex-1, mey, board)){
                area = APP.ai.calculateArea(mex- 1, mey, board);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            //right + x
            if (APP.ai.isPossible(mex + 1, mey, board)){
                area = APP.ai.calculateArea(mex + 1, mey, board);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            board[mex][mey] = false;
        }
    } else {
        if (!board[mex][mey]){
            board[mex][mey] = true;
            //up -y
            if (APP.ai.isPossible(mex, mey - 1, board)){
                area = APP.ai.calculateAreaR(mex, mey-1, board, level-1);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            // down +y
            if (APP.ai.isPossible(mex, mey + 1, board)){
                area = APP.ai.calculateAreaR(mex, mey+1, board,level-1);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            // left -x
            if (APP.ai.isPossible(mex-1, mey, board)){
                area = APP.ai.calculateAreaR(mex- 1, mey, board, level-1);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            //right + x
            if (APP.ai.isPossible(mex + 1, mey, board)){
                area = APP.ai.calculateAreaR(mex + 1, mey, board, level-1);
                if (area > maxArea){
                    maxArea = area;
                }
            }
            board[mex][mey] = false;
        }
    }
    return maxArea;
};

APP.ai.calculateArea3 = function(mex, mey, board){
    var area = -1;
    var maxArea = -board.length * board[0].length;
    if (!board[mex][mey]){
        board[mex][mey] = true;
        //up -y
        if (APP.ai.isPossible(mex, mey - 1, board)){
            area = APP.ai.calculateAreaR(mex, mey-1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // down +y
        if (APP.ai.isPossible(mex, mey + 1, board)){
            area = APP.ai.calculateAreaR(mex, mey+1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // left -x
        if (APP.ai.isPossible(mex-1, mey, board)){
            area = APP.ai.calculateAreaR(mex- 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        //right + x
        if (APP.ai.isPossible(mex + 1, mey, board)){
            area = APP.ai.calculateAreaR(mex + 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        
        board[mex][mey] = false;
    }
    return maxArea;
};
APP.ai.calculateArea2 = function(mex, mey, board){
    var area = -1;
    var maxArea = -board.length * board[0].length;
    if (!board[mex][mey]){
        board[mex][mey] = true;
        //up -y
        if (APP.ai.isPossible(mex, mey - 1, board)){
            area = APP.ai.calculateArea(mex, mey-1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // down +y
        if (APP.ai.isPossible(mex, mey + 1, board)){
            area = APP.ai.calculateArea(mex, mey+1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // left -x
        if (APP.ai.isPossible(mex-1, mey, board)){
            area = APP.ai.calculateArea(mex- 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        //right + x
        if (APP.ai.isPossible(mex + 1, mey, board)){
            area = APP.ai.calculateArea(mex + 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        
        board[mex][mey] = false;
    }
    
    return maxArea;
};

APP.ai.calculateArea3 = function(mex, mey, board){
    var area = -1;
    var maxArea = -board.length * board[0].length;
    if (!board[mex][mey]){
        board[mex][mey] = true;
        //up -y
        if (APP.ai.isPossible(mex, mey - 1, board)){
            area = APP.ai.calculateArea2(mex, mey-1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // down +y
        if (APP.ai.isPossible(mex, mey + 1, board)){
            area = APP.ai.calculateArea2(mex, mey+1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // left -x
        if (APP.ai.isPossible(mex-1, mey, board)){
            area = APP.ai.calculateArea2(mex- 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        //right + x
        if (APP.ai.isPossible(mex + 1, mey, board)){
            area = APP.ai.calculateArea2(mex + 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        
        board[mex][mey] = false;
    }
    
    return maxArea;
};

APP.ai.calculateArea4 = function(mex, mey, board){
    var area = -1;
    var maxArea = -board.length * board[0].length;
    if (!board[mex][mey]){
        board[mex][mey] = true;
        //up -y
        if (APP.ai.isPossible(mex, mey - 1, board)){
            area = APP.ai.calculateArea3(mex, mey-1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // down +y
        if (APP.ai.isPossible(mex, mey + 1, board)){
            area = APP.ai.calculateArea3(mex, mey+1, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        // left -x
        if (APP.ai.isPossible(mex-1, mey, board)){
            area = APP.ai.calculateArea3(mex- 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        //right + x
        if (APP.ai.isPossible(mex + 1, mey, board)){
            area = APP.ai.calculateArea3(mex + 1, mey, board);
            if (area > maxArea){
                maxArea = area;
            }
        }
        
        board[mex][mey] = false;
    }
    
    return maxArea;
};

APP.ai.isPossible = function(x, y, board){
    if (x < 0 || y < 0 || x >= board.height || y >= board[0].height){
        return false;
    }
    return !board[x][y];
};