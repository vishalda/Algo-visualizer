import React from 'react';
import './Node.css';

class Node extends React.Component{
    render(){
        const {
            isFinish,
            isWall,
            isStart,
            col,
            row,
            onMouseDown,
            onMouseEnter,
            onMouseUp
        } = this.props;

        const extraClassNames=isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '';

        return(
            <td 
            id={`node-${row}-${col}`}
            className={`node ${extraClassNames}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={()=>onMouseUp()}></td>
        )
    }
}

export default Node;