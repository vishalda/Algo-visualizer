function aStar(grid,startNode,endNode){
    const visitedNodes=[];
    startNode.distance=0;
    const nodeList=getNodes(grid);
    while(nodeList.length){
        sortUnvisitedNodes(nodeList);
        const currentNode=nodeList.shift();
        if(!currentNode.isWall){
            if(currentNode.distance===Infinity) return visitedNodes;
            currentNode.isVisited=true;
            visitedNodes.push(currentNode);
            if(currentNode===endNode) return visitedNodes;
            updateUnvisitedNodes(currentNode,grid);
        }
    }
    return visitedNodes;
}

function getNodes(grid){
    const nodes=[];
    for(let row of grid){
        for(let node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

function sortUnvisitedNodes(nodeList){
    nodeList.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}

function updateUnvisitedNodes(node,grid){
    const neighbourNodes=getNeighbourNodes(node,grid);
    for(let neighbour of neighbourNodes){
        neighbour.distance=node.distance+1+neighbour.distanceFromFinish;
        neighbour.previousNode=node;
    }
}

function getNeighbourNodes(node,grid){
    const nodes=[];
    const {row,col} = node;
    if(row>0) nodes.push(grid[row-1][col]);
    if(col>0) nodes.push(grid[row][col-1]);
    if(row<grid.length-1) nodes.push(grid[row+1][col]);
    if(col<grid[0].length-1) nodes.push(grid[row][col+1]);
    return nodes.filter((node)=>!node.isVisited);
}

export default aStar;