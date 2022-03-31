import React from 'react';
import './CSS/sort.css';
const PrimaryColor='cyan';
const SecondaryColor='white';

class Sort extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            array:[],
        };
    };

    componentDidMount(){
        this.randomArray();
    }

    randomArray(){
        const array=[];
        for(let i=0;i<50;i++){
            array.push(randomIntFromInterval(10,300));
        }
        this.setState({array},()=>{
            console.log(this.state.array);
        });
    }
    
    async sort(){
        const array=this.state.array;
        const ele=document.querySelectorAll(".div-bar")
        for(let i=0;i<array.length-1;i++){
            for(let j=0;j<array.length-1;j++){
                ele[j].style.background = 'black';
                ele[j+1].style.background = 'black';
                if(array[j]>array[j+1]){
                    let temp=array[j];
                    array[j]=array[j+1];
                    array[j+1]=temp;
                    await this.waitforme(50);
                }
                ele[j].style.background = 'cyan';
                ele[j+1].style.background = 'cyan';
                this.setState({array});
            }
        }
        this.setState({array})
    }

    waitforme(milisec) { 
        return new Promise(resolve => { 
            setTimeout(() => { resolve('') }, milisec); 
        }) 
    }

    render() {
        const {array}=this.state;
        return(
            <div>
                <div className="bar-container">
                    {array.map((val,key)=>(
                        <div key={key} className="div-bar" style={{backgroundColor:`${PrimaryColor}`, height:`${val}px`}}></div>
                    ))}
                </div>
                <button onClick={()=>this.randomArray()}>Generate new string</button>
                <button onClick={()=>this.sort()}>Bubble Sort</button>
            </div>
        );
    }
};

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Sort;