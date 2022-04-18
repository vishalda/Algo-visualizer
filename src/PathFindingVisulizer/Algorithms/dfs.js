function dfs(grid,startNode,endNode){
    let visitedNodes=[];
    let nextNodeList=[];
    nextNodeList.push(startNode);
    while(nextNodeList.length){
        let currentNode=nextNodeList.pop();
        if(currentNode === endNode) return visitedNodes;
        if(!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)){
            currentNode.isVisited=true;
            visitedNodes.push(currentNode);
            let nextNode;
            const {row,col} = currentNode;
            if(row>0){
                nextNode=grid[row-1][col];
                if(!nextNode.isVisited){
                    nextNode.previousNode=currentNode;
                    nextNodeList.push(nextNode);
                }
            }
            if(row<grid.length-1){
                nextNode=grid[row+1][col];
                if(!nextNode.isVisited){
                    nextNode.previousNode=currentNode;
                    nextNodeList.push(nextNode);
                }
            }
            if(col>0){
                nextNode=grid[row][col-1];
                if(!nextNode.isVisited){
                    nextNode.previousNode=currentNode;
                    nextNodeList.push(nextNode);
                }
            }
            if(col<grid[0].length-1){
                nextNode=grid[row][col+1];
                if(!nextNode.isVisited){
                    nextNode.previousNode=currentNode;
                    nextNodeList.push(nextNode);
                }
            }
        }
    }
    return visitedNodes;
}

export default dfs;