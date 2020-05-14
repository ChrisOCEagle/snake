// grab the canvas and get the 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");
const backgroundColor = '#fff';
const borderColor = '#000';
const gameSpeed = 100;
let changingDirection = false;

// initialise the snake
let snake = [{x: canvas.width / 2, y: canvas.height / 2}];
// the snake velocity
let dx = 10,
	dy = 0;
// the snake colours
const snakeColor = 'lightgreen';
const snakeBorderColor = '#000';

// initialise the food coorinates
let foodX;
let foodY;
const foodColor = 'red';
const foodBorderColor = '#000';

// initialise the score
let score = 0;

// run the game every 100 milliseconds
createFood();
game();

function game() {
	if (didGameEnd()) {
		return;
	};
	setTimeout(function onTick() {
		// clear the canvas
		clearCanvas();
		// create new food
		drawFood();
		// move the snake
		advanceSnake();
		// draw the snake
		drawSnake();
		
		// rerun the game
		game();
	}, gameSpeed);
};

function drawSnake() {
	// draw each part of the snake
	snake.forEach(drawSnakePart);
};

function drawSnakePart(snakePart) {
	ctx.fillStyle = snakeColor;
	ctx.strokeStyle = snakeBorderColor;
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

// moving the snake
function advanceSnake() {
	// the head of the snake
	const head = {x: snake[0].x + dx, y: snake[0].y + dy};
	snake.unshift(head);
	// check if the snake has eaten some food
	const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
	if (didEatFood) {
		createFood();
		score += 10;
		document.getElementById('score').innerHTML = score;
	} else {
		snake.pop();
	}
};

// clearing the canvas
function clearCanvas() {
	ctx.fillStyle = backgroundColor;
	ctx.strokeStyle = borderColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);	
};

// change the direction on a key press
function changeDirection() {
	// grab the key codes for the arrows keys
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;
	
	// grab which key was pressed
	const keyPressed = event.keyCode;
	
	// setting the new direction
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10;
	
	// check if the object is moving in the direction of the key press
	if (keyPressed === LEFT_KEY && !goingRight) {
		dx = -10;
		dy = 0;
	} else if (keyPressed === UP_KEY && !goingDown) {
		dx = 0;
		dy = -10;
	} else if (keyPressed === RIGHT_KEY && !goingLeft) {
		dx = 10;
		dy = 0;
	} else if (keyPressed === DOWN_KEY && !goingDown) {
		dx = 0;
		dy = 10;
	}
};

document.addEventListener("keydown", changeDirection);

// creating snake food
function randomTen(min, max) {
	return Math.round((Math.random() * (max-min) + min) / 10) * 10;
};

function createFood() {
	foodX = randomTen(0, gameCanvas.width - 10);
	foodY = randomTen(0, gameCanvas.height - 10);
	
	snake.forEach(function isFoodOnSnake(part) {
		const foodIsOnSnake = part.x === foodX && part.y === foodY;
		if (foodIsOnSnake) {
			createFood();
		};
	});
};

function drawFood() {
	ctx.fillStyle = foodColor;
	ctx.strokestyle = foodBorderColor;
	ctx.fillRect(foodX, foodY, 10, 10);
	ctx.strokeRect(foodX, foodY, 10, 10);
};

// ending the game
function didGameEnd() {
	for (let i = 1; i < snake.length; i++) {
		// check if the snake ever collided with itself
		const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
		if (didCollide) {
			return true;
		};
		// check if the snake collides with a wall
		const hitLeftWall = snake[0].x < 0;
		const hitRightWall = snake[0].x > gameCanvas.width - 10;
		const hitToptWall = snake[0].y < 0;
		const hitBottomWall = snake[0].y > gameCanvas.height - 10;
		if (hitRightWall || hitLeftWall || hitToptWall || hitBottomWall) {
			return true;
		};
	};
};
