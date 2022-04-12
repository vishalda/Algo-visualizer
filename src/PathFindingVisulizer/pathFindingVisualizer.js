import React from 'react';

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
            COL_COUNT:35,
            ROW_COUNT:25,
            curRow:null,
            curCol:null
        };
    }

    componentDidMount(){
        const grid=this.InitialGrid();
        this.setState({grid});
        console.log(grid);
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
            isStart:row===this.state.START_NODE_ROW && col===this.state.START_NODE_COL,
            isFinish:row===this.start.FINISH_NODE_ROW && col===this.state.FINISH_NODE_COL,
            isWall:false,
            isNode:true,
            distance:Infinity,
            distanceFromFinish:Math.abs(this.state.FINISH_NODE_COL-col)+Math.abs(this.state.FINISH_NODE_ROW-row),
            previousNode:null,
        }
    }

    render(){
        return(
            <h1>Hello</h1>
        )
    }
}

export default PathFinder;