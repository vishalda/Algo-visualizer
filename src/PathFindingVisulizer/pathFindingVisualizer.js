import React from 'react';
import Node from './Node/Node';
import './pathFindingVisualizer.css';

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
            START_NODE_ROW:5,
            START_NODE_COL:5,
            FINISH_NODE_ROW:20,
            FINISH_NODE_COL:35,
            COL_COUNT:50,
            ROW_COUNT:30,
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

    render(){
        return(
            <div>
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
                <div>
                    <button onClick={()=>{this.clearWalls()}}>Clear Wall</button>
                    <button onClick={()=>{this.clearGrid()}}>Clear Grid</button>
                </div>
            </div>
        );
    }
}

export default PathFinder;