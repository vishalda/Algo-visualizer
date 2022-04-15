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
            FINISH_NODE_ROW:5,
            FINISH_NODE_COL:15,
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
                                            <Node key={nodeIdx} col={col} row={row} isFinish={isFinish} isStart={isStart} isWall={isWall}></Node>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PathFinder;