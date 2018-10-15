class Node {
    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.isWalkable = true;
        this.parent = null;
        this.gCost = 0;
        this.hCost = 0;  
    }

    getFcost() {
        return this.gCost + this.hCost;
    }
}


class Grid {
    constructor(width, height) {
        this.grid = [];
        this.width = width;
        this.height = height;

        for(let y = 0; y < height; y++) {
            this.grid[y] = new Array(width);
        }
        
        for(let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = new Node(y,x);
            }
        }
    }

    setObstacles(obstaclesPos) {
        if(obstaclesPos.length === 0)
            return;

        for(let i = 0; i < obstaclesPos.length; i++) {
            if(obstaclesPos[i].x !== undefined && obstaclesPos[i].y !== undefined) {
                this.grid[obstaclesPos[i].y][obstaclesPos[i].x].isWalkable = false; 
            }
        }
    }

    
    draw(startNode, endNode, path) {
        let text =  "";
        for(let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {

                if(this.grid[y][x].isWalkable === false)
                    text+= "[X]";
                
                else if (y == startNode.y && x == startNode.x)
                    text+= "[S]";
                
                else if(y == endNode.y && x == endNode.x)
                    text+="[E]";
                else 
                    text+="[ ]";
            }
            console.log(text);
            text = "";
        }
    }

    getAdjacents(currentPos) {
        
        if(currentPos.x === undefined || currentPos.y === undefined)
            return;
        const adjacents = [];

        //Get Vertical Adjacents Nodes
        for(let y = -1; y<=1; y++) {

            if(y===0)
                continue;

            let yAdjacent = currentPos.y + y;
            
            if(yAdjacent >= 0 && yAdjacent < this.height)
                adjacents.push(this.grid[yAdjacent][currentPos.x]);
            
        }

        //Get Horizontal Adjacents Nodes
        for(let x = -1; x <= 1; x++) {
            if(x===0)
                continue;
            
            let xAdjacent = currentPos.x + x;

            if(xAdjacent >= 0 && xAdjacent < this.width)
                adjacents.push(this.grid[currentPos.y][xAdjacent]);

        }

        return adjacents;
    }

    getNodeAt(x, y) {
        if((x !== undefined && y !== undefined) || (x >= 0 && x < this.grid.width ) || (y >= 0 && y < this.grid.height))
            return this.grid[y][x];
    }

}

module.exports = {
    Grid
};
