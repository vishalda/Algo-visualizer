import React from 'react';

function bfs(grid,startNode,endNode){
    let nextNode=[startNode];
    const visitedNodes=[];
    while(nextNode.length){
        var curNode=nextNode.shift();
        if(curNode===endNode) return(visitedNodes);
        if(!curNode.isWall && (curNode.isStart || !curNode.isVisited)){
            curNode.isVisited=true;
            visitedNodes.push(curNode);
            if(curNode.row>0){
                let newNode=grid[curNode.row-1][curNode.col];
                if(!newNode.isVisited){
                    newNode.previousNode=curNode;
                    nextNode.push(newNode);
                }
            }
            if(curNode.row<grid.length-1){
                let newNode=grid[curNode.row+1][curNode.col];
                if(!newNode.isVisited){
                    newNode.previousNode=curNode;
                    nextNode.push(newNode);
                }
            }
            if(curNode.col>0){
                let newNode=grid[curNode.row][curNode.col-1];
                if(!newNode.isVisited){
                    newNode.previousNode=curNode;
                    nextNode.push(newNode);
                }
            }
            if(curNode.col<grid[0].length-1){
                let newNode=grid[curNode.row][curNode.col+1];
                if(!newNode.isVisited){
                    newNode.previousNode=curNode;
                    nextNode.push(newNode);
                }
            }
        }
    }
    return visitedNodes;
}

export default bfs;