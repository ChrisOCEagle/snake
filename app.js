// get the margins on the document's body
var docBody = document.querySelector("body"),
    bodyStyle = docBody.currentStyle || window.getComputedStyle(docBody);
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
var canvasX = Math.floor(canvasCoord.x - parseInt(bodyStyle.marginLeft))/2,
    canvasY = Math.floor(canvasCoord.y),
    topEdge = Math.floor(canvasCoord.top - parseInt(bodyStyle.marginTop)),
    bottomEdge = Math.floor(canvasCoord.bottom - parseInt(bodyStyle.marginTop) - canvasY),
    rightEdge = Math.floor(canvasCoord.right - parseInt(bodyStyle.marginLeft) - canvasX*3),
    leftEdge = Math.floor(canvasCoord.left - parseInt(bodyStyle.marginLeft) - canvasX*2),
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

// this will be for creating a small red box in a random location
function createPointBox() {
    // if the red box already exists remove it before creating another one
    if (document.getElementById("red-box") !== null) {
        canvas.removeChild(document.getElementById("red-box"));
    };
    // create the div that will contain the small red box
    var div = document.createElement("div");
    // add styles to the small red box
    div.style.width = "2.5%";
    div.style.height = "2.5%";
    div.style.backgroundColor = "#f00";
    div.style.position = "absolute";
    // create a coordinate array that will contain the current coordinates of the point box
    var coordinateArray = [];
    // generate random numbers for both the x and y coordinates of the point box
    var randomCoordinates = {
        x: Math.floor(Math.random() * (canvasDim.width - canvasDim.x)) + (canvasDim.x / 2),
        y: Math.floor(Math.random() * (canvasDim.height - canvasDim.y)) + (canvasDim.y / 2),
    };
    if (randomCoordinates.x % 10 === 0 && randomCoordinates.y % 10 === 0) {
        if (!Array.isArray(coordinateArray) || !coordinateArray.length) {
            div.style.left = randomCoordinates.x + "px";
            div.style.top = randomCoordinates.y + "px";
            coordinateArray.push(randomCoordinates);
        } else if (!isEqual(coordinateArray[0], randomCoordinates)) {
            console.log("not equal")
        };
    };
    // add an id to the red box
    div.id = "red-box";
    // add the new div to the canvas
    canvas.appendChild(div);
};

function getPointBoxCoordinate() {
    // get the red box and the coordinates of the red box
    var pointBox = document.getElementById("red-box"),
    pointBoxCoord = pointBox.getBoundingClientRect(),
    pointBoxCoordinates = {
        x: Math.floor(pointBoxCoord.x - parseInt(bodyStyle.marginLeft) - (canvasDim.x * 5 / 2)),
        y: Math.floor(pointBoxCoord.y - parseInt(bodyStyle.marginTop) - (canvasDim.y / 2)),
    };
    return pointBoxCoordinates;
};

function movePointBox() {
    createPointBox();
    getPointBoxCoordinate();
};

movePointBox();

document.onkeydown = function (event) {
    let pointBoxCoordinates = getPointBoxCoordinate();
    if (event.key === "ArrowUp") {
        playerCoordinates.y -= 10;
        player.style.top = playerCoordinates.y + 'px';
        if (playerCoordinates.y < canvasDim.top) {
            playerCoordinates.y += canvasDim.height;
            player.style.top = playerCoordinates.y + 'px';
        } else if (isEqual(playerCoordinates, pointBoxCoordinates)) {
            // move the point box
            movePointBox();
            console.log("You scored!")
        };
    } else if (event.key === "ArrowDown") {
        playerCoordinates.y += 10;
        player.style.top = playerCoordinates.y + 'px';
        if (playerCoordinates.y >= canvasDim.bottom) {
            playerCoordinates.y -= canvasDim.height;
            player.style.top = playerCoordinates.y + 'px';
        } else if (isEqual(playerCoordinates, pointBoxCoordinates)) {
            // move the point box
            movePointBox();
            console.log("You scored!")
        };
    } else if (event.key === "ArrowRight") {
        playerCoordinates.x += 10;
        player.style.left = playerCoordinates.x + 'px';
        if (playerCoordinates.x >= canvasDim.right) {
            playerCoordinates.x -= canvasDim.width;
            player.style.left = playerCoordinates.x + 'px';
        } else if (isEqual(playerCoordinates, pointBoxCoordinates)) {
            // move the point box
            movePointBox();
            console.log("You scored!")
        };
    } else if (event.key === "ArrowLeft") {
        playerCoordinates.x -= 10;
        player.style.left = playerCoordinates.x + 'px';
        if (playerCoordinates.x < canvasDim.left) {
            playerCoordinates.x += canvasDim.width;
            player.style.left = playerCoordinates.x + 'px';
        } else if (isEqual(playerCoordinates, pointBoxCoordinates)) {
            // move the point box
            movePointBox();
            console.log("You scored!")
        };
    };
    /* console.log('player: ', playerCoordinates); */
    /* console.log('point box: ', pointBoxCoordinates); */
};

// create a function that will determine whether the values and properties of two objects is equal
function isEqual(objA, objB) {
    // if either objA or objB are not objects than these are obviously not equivalent
    if (typeof objA !== typeof {} || typeof objB !== typeof {}) {
        return  false;
    };
    // create some arrays that will hold the property names for each object
    var aProps = Object.getOwnPropertyNames(objA);
    var bProps = Object.getOwnPropertyNames(objB);
    // if the properties are different than the objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    };
    // loop through one of the object's properties
    for (let i = 0; i < aProps.length; i++) {
        // grab the property name
        var propName = aProps[i];
        // if the values of the same property are not equal than the objects are not equivalent
        if (objA[propName] !== objB[propName]) {
            return false;
        };
    };
    // if the objects have made it this far than they are considered equivalent
    return true;
};
