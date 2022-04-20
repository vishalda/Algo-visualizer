import React from 'react';
import Node from './Node/Node';
import bfs from './Algorithms/bfs';
import dfs from './Algorithms/dfs';
import './pathFindingVisualizer.css';
import dijkstra from './Algorithms/dijkstra';

class PathFinder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            grid:[],
            isMousePressed:false,
            isStartNode:false,
            isFinishNode:false,
            isWallNode:false,
            isRunning:false,
            START_NODE_ROW:9,
            START_NODE_COL:10,
            FINISH_NODE_ROW:10,
            FINISH_NODE_COL:40,
            COL_COUNT:50,
            ROW_COUNT:25,
            curRow:null,
            curCol:null
        };
    }

    componentDidMount(){
        const grid=this.InitialGrid();
        this.setState({grid});
    }

    InitialGrid(){
        var grid=[];
        var row=this.state.ROW_COUNT;
        var col=this.state.COL_COUNT;
        for(var i=0;i<row;i++){
            var rowArray=[]
            for(var j=0;j<col;j++){
                rowArray.push(this.createNode(i,j));
            }
            grid.push(rowArray);
        }
        return grid;
    }

    toggleIsRunning(){
        let running=this.state.isRunning;
        this.setState({
            isRunning:!running
        });
    }

    createNode=(row,col)=>{
        return{
            row:row,
            col:col,
            isStart:
            row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            isFinish:
            row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
            isWall:false,
            isNode:true,
            isVisited:false,
            distance:Infinity,
            distanceFromFinish:Math.abs(this.state.FINISH_NODE_COL-col)+Math.abs(this.state.FINISH_NODE_ROW-row),
            previousNode:null,
        }
    }

    getNewGridWithWallToggled=(row,col)=>{
        const newGrid=this.state.grid.slice();
        const node=newGrid[row][col];
        if(!node.isFinish && !node.isStart){
            const newNode={
                ...node,
                isWall:!node.isWall
            }
            newGrid[row][col]=newNode;
        }
        return newGrid;
    }

    handleMouseDown=(row,col)=>{
        if(!this.state.isRunning){
            if(document.getElementById(`node-${row}-${col}`).className==="node node-start"){
                this.setState({
                    isMousePressed:true,
                    curCol:col,
                    curRow:row,
                    isStartNode:true
                });
            }else if(document.getElementById(`node-${row}-${col}`).className==="node node-finish"){
                this.setState({
                    isMousePressed:true,
                    curCol:col,
                    curRow:row,
                    isFinishNode:true
                })
            }else{
                const newGrid=this.getNewGridWithWallToggled(row,col);
                this.setState({
                    grid:newGrid,
                    isMousePressed:true,
                    curCol:col,
                    curRow:row,
                    isWallNode:true
                })
            }
        }
    }

    handleMouseEnter=(row,col)=>{
        if(!this.state.isRunning){
            if(this.state.isMousePressed){
                if(document.getElementById(`node-${row}-${col}`).className==="node node-start"){
                    this.setState({
                        isMousePressed:true,
                        curCol:col,
                        curRow:row,
                        isStartNode:true
                    });
                }else if(document.getElementById(`node-${row}-${col}`).className==="node node-finish"){
                    this.setState({
                        isMousePressed:true,
                        curCol:col,
                        curRow:row,
                        isFinishNode:true
                    })
                }else{
                    const newGrid=this.getNewGridWithWallToggled(row,col);
                    this.setState({
                        grid:newGrid,
                        isMousePressed:true,
                        curCol:col,
                        curRow:row,
                        isWallNode:true
                    })
                }
            }   
        }
    }

    handleMouseUp=(row,col)=>{
        if(!this.state.isRunning){
            this.setState({
                isMousePressed:false
            });
            if(this.state.isStartNode){
                this.setState({
                    isStartNode:false,
                    START_NODE_COL:col,
                    START_NODE_ROW:row
                })
            }else if(this.state.isFinishNode){
                this.setState({
                    isFinishNode:false,
                    FINISH_NODE_COL:col,
                    FINISH_NODE_ROW:row
                })
            }
        }
    }

    clearWalls=()=>{
        if(!this.state.isRunning){
            const newGrid=this.state.grid.slice();
            for (const row of newGrid) {
                for (const node of row) {
                    let nodeClassName = document.getElementById(
                        `node-${node.row}-${node.col}`,
                    ).className;
                    if (nodeClassName === 'node node-wall') {
                        document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                        node.isWall = false;
                    }
                }
            }
        }
    }

    clearGrid=()=>{
        if(!this.state.isRunning){
            const newGrid=this.state.grid.slice();
            for(const row of newGrid){
                for(const node of row){
                    let nodeClassName=document.getElementById(`node-${node.row}-${node.col}`).className;
                    if (
                        nodeClassName !== 'node node-start' &&
                        nodeClassName !== 'node node-finish' &&
                        nodeClassName !== 'node node-wall'
                    ) {
                        document.getElementById(`node-${node.row}-${node.col}`).className =
                          'node';
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode =
                          Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                          Math.abs(this.state.FINISH_NODE_COL - node.col);
                    }
                    if (nodeClassName === 'node node-finish') {
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode = 0;
                    }
                    if (nodeClassName === 'node node-start') {
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode =
                          Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                          Math.abs(this.state.FINISH_NODE_COL - node.col);
                        node.isStart = true;
                        node.isWall = false;
                        node.previousNode = null;
                        node.isNode = true;
                    }
                }
            }
        }
    }

    getShortestPath=(finishNode)=>{
        let shortestPath=[];
        let curNode=finishNode;
        while(curNode!=null){
            shortestPath.unshift(curNode);
            curNode=curNode.previousNode;
        }
        return shortestPath;
    }

    visualize=(algo)=>{
        this.clearGrid();
        this.toggleIsRunning();
        let grid=this.state.grid;
        let startNode=grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        let finishNode=grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        let visitedNodes=[];
        switch (algo){
            case 'bfs':
                visitedNodes=bfs(grid,startNode,finishNode);
                break;
            case 'dfs':
                visitedNodes=dfs(grid,startNode,finishNode);
                break;
            case 'dijkstra':
                visitedNodes=dijkstra(grid,startNode,finishNode);
                break;
            default:
                break;
        }
        const shortestPath=this.getShortestPath(finishNode);
        shortestPath.push('end');
        this.animate(shortestPath,visitedNodes);
    }

    animate=(shortestPath,visitedNodes)=>{
        for(let i=0;i<=visitedNodes.length;i++){
            if(visitedNodes.length===i){
                setTimeout(()=>{
                    this.animateShortestPath(shortestPath);
                },i*10);
            }
            setTimeout(()=>{
                const node=visitedNodes[i];
                let nodeClassName=document.getElementById(`node-${node.row}-${node.col}`).className;
                if(nodeClassName!=="node node-start" && nodeClassName!=="node node-finish"){
                    document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
                }
            },10*i);
        }
    }

    animateShortestPath=(shortestPath)=>{
        for(let i=0;i<shortestPath.length;i++){
            if(shortestPath[i]==='end'){
                setTimeout(()=>{
                    this.toggleIsRunning();
                },i*50);
            }
            setTimeout(()=>{
                let node=shortestPath[i];
                let nodeClassName=document.getElementById(`node-${node.row}-${node.col}`).className;
                if(nodeClassName!=="node node-start" && nodeClassName!=="node node-finish"){
                    document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';
                }
            },i*40);
        }
    }

    render(){
        return(
            <div>
                <div className='path-finding-header'>
                    <h1>Path Finding Visualizer</h1>
                </div>
                <table className='grid-container'>
                    <tbody className='grid'>
                        {this.state.grid.map((row,rowIdx)=>{
                            return(
                                <tr key={rowIdx}>
                                    {row.map((node,nodeIdx)=>{
                                        const {col,row,isFinish,isStart,isWall} = node;
                                        return(
                                            <Node 
                                            key={nodeIdx} 
                                            col={col} 
                                            row={row} 
                                            isFinish={isFinish} 
                                            isStart={isStart} 
                                            isWall={isWall}
                                            onMouseDown={(row,col)=>{this.handleMouseDown(row,col)}}
                                            onMouseEnter={(row,col)=>{this.handleMouseEnter(row,col)}}
                                            onMouseUp={(row,col)=>{this.handleMouseUp(row,col)}}
                                            ></Node>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className='path-finding-footer'>
                    <button onClick={()=>{this.clearWalls()}} className="button">Clear Wall</button>
                    <button onClick={()=>{this.clearGrid()}} className="button">Clear Grid</button>
                    <button onClick={()=>{this.visualize('bfs')}} className="button">BFS</button>
                    <button onClick={()=>{this.visualize('dfs')}} className="button">DFS</button>
                    <button onClick={()=>{this.visualize('dijkstra')}} className="button">Dijkstra</button>
                </div>
            </div>
        );
    }
}

export default PathFinder;