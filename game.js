var APP = APP || {};

// All coordinates of the form (x, y) follow the usual cartesian coordinates
// on a computer (y points downwards, x points right)
// All matrices A[x][y] follow the cartesian coordinates, so
// [[1, 2, 3], [4, 5, 6]] shows up as
// 1 4
// 2 5
// 3 6
// on the user's screen.

APP.Game = class{
    // xs and ys (same size) are the initial positions of the cybercycles
    // dir is an array of the initial directions of the cybercycles, default is
    // up.
    // windowWidth and windowHeight describe the dimensions of the game board
    constructor(xs, ys, dir, boardWidth, boardHeight){
        this.xs = xs;
        this.ys = ys;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.board = new Array(boardWidth);
        
        
        var column;
        for (var x = 0; x < boardWidth; x++){
            column = new Array(boardHeight);
            var isOccupied;
            for (var y = 0; y < boardHeight; y++){
                isOccupied = false;
                for (var i = 0; i < xs.length; i++){
                    if (xs[i] == x && ys[i] == y || x === 0 ||
                        y === 0 || x === boardWidth -1 ||
                        y === boardHeight - 1){
                        isOccupied = true;
                    }
                }
                column[y] = isOccupied;
            }
            this.board[x] = column;
        }
        this.prev = [];
        this.statuses = [];
        for (var i = 0; i < dir.length; i++){
            var vx = 0;
            var vy = 0;
            if (dir[i] == "u"){
                vy = -1;
            } else if (dir[i] == "d"){
                vy = 1;
            } else if (dir[i] == "l"){
                vx = -1;
            } else if (dir[i] == "r"){
                vx = 1;
            } else {
                vx = -1;
                vy = 0;
            }
            this.prev.push([vx, vy]);   
            this.statuses.push(true);
        }
    }
    // moves contains all the previous moves
    // it is an array of strings being either "u", "d", "l" or "r",
    // depending on the direction of the cybercycles
    update(moves){
        // TODO: update board
        console.log(moves);
        for (var i = 0; i < moves.length; i++){
            if(this.statuses[i]){
                console.log(i);
                var vx = 0;
                var vy = 0;
                if (moves[i] == "u"){
                    vy = -1;
                } else if (moves[i] == "d"){
                    vy = 1;
                } else if (moves[i] == "l"){
                    vx = -1;
                } else if (moves[i] == "r"){
                    vx = 1;
                } else {
                    vx = this.prev[i][0];
                    vy = this.prev[i][1];
                }
                this.xs[i] += vx;
                this.ys[i] += vy;
                if (this.ys[i] === -1 || this.ys[i] === this.boardHeight){
                    this.statuses[i] = false;
                } else if(this.xs[i] === -1 || this.xs[i] === this.boardWidth){
                    this.statuses[i] = false;
                } else if (this.board[this.xs[i]][this.ys[i]]) {
                    this.statuses[i] = false;
                } else {
                    this.board[this.xs[i]][this.ys[i]] = true;
                    this.prev[i] = [vx, vy];
                }
            }
        }
    }
    isOver(){
        var res = false;
        for (var i = 0; i < this.statuses.length; i++){
            if (!this.statuses[i]){
                res = true;
            }
        }
        return res;
    }
    
};