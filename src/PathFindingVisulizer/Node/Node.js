import React from 'react';
import './Node.css';

class Node extends React.Component{
    render(){
        const {
            isFinish,
            isWall,
            isStart,
            col,
            row
        } = this.props;

        const extraClassNames=isFinish ? 'node-finish' : isStart ? 'node-start' ? isWall : 'node-wall' : '';

        return(
            <td 
            id={`node-${row}-${col}`}
            className={`node ${extraClassNames}`}></td>
        )
    }
}

export default Node;