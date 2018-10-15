const findPath =  (startPos, endPos, grid) => {
    let openList = [];
    const closedList = [];
    
    let startNode = grid.getNodeAt(startPos.x, startPos.y);
    let endNode = grid.getNodeAt(endPos.x, endPos.y);

    openList.push(startNode);
    
    while(openList.length > 0) {
        
        let currentNode = openList[0];
        
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].getFcost() < currentNode.getFcost() || openList[i].getFcost() === currentNode.getFcost() && openList[i].hCost <  currentNode.hCost) {
                currentNode = openList[i];
            }
            
        }

        openList = openList.filter((node) => { return Object.is(node, currentNode) === false; });

        
        closedList.push(currentNode);

        if (Object.is(currentNode, endNode) === true)
            return retracePath(startNode, endNode);

        for (let adjacentNode of grid.getAdjacents(currentNode)) {

            

            if (adjacentNode.isWalkable === false || isInList(closedList, adjacentNode) === true)
                continue;

           
            let newMovementToAdjacentNode = currentNode.gCost + calculateDistance(currentNode, adjacentNode);
            //console.log(currentNode.gCost);
            
            if (newMovementToAdjacentNode < adjacentNode.gCost || isInList(openList, adjacentNode) === false) {
                adjacentNode.gCost = newMovementToAdjacentNode;
                adjacentNode.hCost = calculateDistance(adjacentNode, endNode);
                adjacentNode.parent = currentNode;

                if (isInList(openList, adjacentNode) === false) {
                    openList.push(adjacentNode);
                }
                
            }

        }
        
    }

    // return closedList;

}
//function to calculate distance between nodes
const calculateDistance = (nodeA, nodeB) => {
    if (nodeA === undefined || nodeB === undefined)
        return;

    const nodeALocation = nodeA.x + nodeA.y;
    const nodeBLocation = nodeB.x + nodeB.y
    const distance = nodeALocation - nodeBLocation;

    return distance * Math.sign(distance);   
}

const retracePath = (startNode, endNode) => {
    const path = [];

    let currentNode = endNode;

    while (Object.is(currentNode, startNode) === false) {
        path.push(currentNode);
        currentNode = currentNode.parent;  
    }

    return path;
}


//helper function to check if object is in the list
const isInList = (list, currentNode) => {
    return list.filter(node => Object.is(node, currentNode)).length >= 1 ? true : false;   
}

module.exports = { findPath };