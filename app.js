// get the margins on the document's body
var docBody = document.querySelector("body");
var bodyStyle = docBody.currentStyle || window.getComputedStyle(docBody);
/* console.log('body top margin: ' + bodyStyle.marginTop, '\nbody left margin: ' + bodyStyle.marginLeft); */

// get the player and their coordinate position
var player = document.getElementById("player"),
    playerCoord = player.getBoundingClientRect(),
    playerCoordinates = {
        x: Math.floor(playerCoord.x - parseInt(bodyStyle.marginLeft)),
        y: Math.floor(playerCoord.y - parseInt(bodyStyle.marginTop)),
    };
/* console.log(playerCoord, 'player coordinates: ', playerCoordinates); */

// get the canvas and the dimensions of the canvas
var canvas = document.getElementById("game"),
    canvasStyle = canvas.currentStyle || window.getComputedStyle(canvas),
    canvasCoord = canvas.getBoundingClientRect();
/* console.log('canvas coordinates: ', canvasCoord); */
/* console.log('canvas top margin: ' + canvasStyle.marginTop, '\ncanvas left margin: ' + canvasStyle.marginLeft); */

// get the top edge of the canvas which is computed by canvasCoord.top minus canvasCoord.y
// get the right edge of the canvas which is computed by canvasCoord.width minus canvasCoord.x
// get the bottom edge of the canvas which is computed by canvasCoord.height minus canvasCoord.y
// get the left edge of the canvas which is computed by canvasCoord.left minus canvasCoord.x
var canvasX = Math.floor(canvasCoord.x - parseInt(bodyStyle.marginLeft)),
    canvasY = Math.floor(canvasCoord.y),
    topEdge = Math.floor(canvasCoord.top - parseInt(bodyStyle.marginTop)),
    bottomEdge = Math.floor(canvasCoord.bottom - parseInt(bodyStyle.marginTop)),
    rightEdge = Math.floor(canvasCoord.right - parseInt(bodyStyle.marginLeft) - canvasX),
    leftEdge = Math.floor(canvasCoord.left - parseInt(bodyStyle.marginLeft) - canvasX),
    canvasWidth = canvasCoord.width - canvasX,
    canvasHeigth = canvasCoord.height - canvasY,
    canvasDim = {
        top: topEdge,
        right: rightEdge,
        bottom: bottomEdge,
        left: leftEdge,
        width: canvasWidth,
        height: canvasHeigth,
        x: canvasX,
        y: canvasY,
    };
/* console.log(canvasDim); */

document.onkeydown = function (event) {
    if (event.key === "ArrowUp") {
        playerCoordinates.y -= 10;
        player.style.top = playerCoordinates.y + 'px';
        if (playerCoordinates.y < canvasDim.top) {
            playerCoordinates.y += canvasDim.height;
            player.style.top = playerCoordinates.y + 'px';
        };
    } else if (event.key === "ArrowDown") {
        playerCoordinates.y += 10;
        player.style.top = playerCoordinates.y + 'px';
        if (playerCoordinates.y >= (canvasDim.bottom - canvasDim.y)) {
            playerCoordinates.y -= canvasDim.height;
            player.style.top = playerCoordinates.y + 'px';
        };
    } else if (event.key === "ArrowRight") {
        playerCoordinates.x += 10;
        player.style.left = playerCoordinates.x + 'px';
        if (playerCoordinates.x >= (canvasDim.right - canvasDim.x)) {
            playerCoordinates.x -= canvasDim.width;
            player.style.left = playerCoordinates.x + 'px';
        };
    } else if (event.key === "ArrowLeft") {
        playerCoordinates.x -= 10;
        player.style.left = playerCoordinates.x + 'px';
        if (playerCoordinates.x < canvasDim.left) {
            playerCoordinates.x += canvasDim.width;
            player.style.left = playerCoordinates.x + 'px';
        };
    };
    /* console.log(playerCoordinates); */
};
