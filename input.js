var APP = APP || {};

APP.input = {};

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 40) {
		APP.downPressed = true;
	}
    if(e.keyCode == 39) {
        APP.rightPressed = true;
    }
	else if (e.keyCode == 38) {
		APP.upPressed = true;
	}
    else if(e.keyCode == 37) {
        APP.leftPressed = true;
    }
    if (e.keyCode == 32){
        APP.spacePressed = true;
    }
}

APP.input.getArrowInputs = function(){
    if (APP.upPressed){
        return "u";
    } else if (APP.downPressed){
        return "d";
    } else if (APP.leftPressed){
        return "l";
    } else if (APP.rightPressed){
        return "r";
    }
    return "n";
};

APP.input.getSpace = function(){
    return APP.spacePressed;
}

APP.input.resetInputs = function() {
    APP.upPressed = false;
    APP.downPressed = false;
    APP.leftPressed = false;
    APP.rightPressed = false;
    APP.spacePressed = false;
};