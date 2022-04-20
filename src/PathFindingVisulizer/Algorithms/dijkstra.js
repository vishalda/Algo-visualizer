function dijkstra(grid,startNode,endNode){
    const visitedNodes=[];
    startNode.distance=0;
    const unVisitedNodes=getGrid(grid);
    while(unVisitedNodes.length){
        getSortedList(unVisitedNodes);
        const currentNode=unVisitedNodes.shift();
        if(!currentNode.isWall){
            if(currentNode.distance===Infinity) return visitedNodes;
            currentNode.isVisited=true;
            visitedNodes.push(currentNode);
            if(currentNode===endNode) return visitedNodes;
            updateVisitedNodes(currentNode,grid);
        }
    }
    return visitedNodes;
}

function getGrid(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

function getSortedList(nodes){
    nodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}

function updateVisitedNodes(curNode,grid){
    let neighbourNodes=getNeighbourNodes(curNode,grid);
    for(const node of neighbourNodes){
        node.distance=curNode.distance+1;
        node.previousNode=curNode;
    }
}

function getNeighbourNodes(node,grid){
    const nodeList=[];
    const {row,col} = node;
    if(row>0) nodeList.push(grid[row-1][col]);
    if(row<grid.length-1) nodeList.push(grid[row+1][col]);
    if(col>0) nodeList.push(grid[row][col-1]);
    if(col<grid[0].length-1) nodeList.push(grid[row][col+1]);
    return nodeList.filter(neighbour=> !neighbour.isVisited);
}

export default dijkstra;