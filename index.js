const { Grid } = require('./grid');
const { findPath } = require('./pathFinding');

const grid = new Grid(10,10);

const startNode = grid.getNodeAt(0, 0);
const endNode = grid.getNodeAt(8,8);

function generateBlock(numOfBlocks) {
	let obstacles = [];
	for (let i = 0; i <= numOfBlocks ; i++) {
		let randomX = randomInRange(0, grid.width -1);
		let randomY = randomInRange(0, grid.height -1);
		while(randomX == randomInRange(0, grid.width -1) 
			&& randomY == randomInRange(0, grid.height -1) || randomX == startNode.x && randomY == startNode.y 
			|| randomX == endNode.x && randomY == endNode.y){

			randomX = randomInRange(0, grid.width -1);
			randomY = randomInRange(0, grid.height -1);

		}

		let obstacle = { x: randomX, y: randomY };
		obstacles.push(obstacle);
	}
	return obstacles;
}
const obstacles = generateBlock(10);

grid.setObstacles(obstacles);

//console.log(grid.getAdjacents({ x: 0, y: 0 }));

let path = findPath({x : startNode.x, y : startNode.y}, {x : endNode.x, y : endNode.y}, grid);
grid.draw(startNode, endNode, path);

for (let node of path) {
     console.log("[" + node.y + "] " + "[" + node.x + "]" );
}

function randomInRange(min, max){
	return Math.floor(Math.random()*(max-min + 1)) + min;
}