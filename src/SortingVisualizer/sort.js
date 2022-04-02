import React from 'react';
import './CSS/sort.css';
const PrimaryColor='#00ADB5';
const backgroundColor='#222831';
const footerColor='rgb(23,25,28)';
const SecondaryColor='#EEEEEE';

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
            array.push(randomIntFromInterval(10,500));
        }
        this.setState({array});
    }
    
    async bubbleSort(){
        const array=this.state.array;
        const ele=document.querySelectorAll(".div-bar")
        for(let i=0;i<array.length-1;i++){
            for(let j=0;j<array.length-1;j++){
                ele[j].style.background = `${SecondaryColor}`;
                ele[j+1].style.background = `${SecondaryColor}`;
                if(array[j]>array[j+1]){
                    let temp=array[j];
                    array[j]=array[j+1];
                    array[j+1]=temp;
                    await waitforme(20);
                }
                ele[j].style.background = `${PrimaryColor}`;
                ele[j+1].style.background = `${PrimaryColor}`;
                this.setState({array});
            }
        }
        this.setState({array})
    }

    async selectionSort(){
        let i,j,min_idx;
        const array=this.state.array;
        const ele=document.querySelectorAll(".div-bar")
        for(i=0;i<array.length-1;i++){
            min_idx=i;
            ele[i].style.background = `${SecondaryColor}`;
            for(j=i+1;j<array.length;j++){
                ele[j].style.background = `${SecondaryColor}`;
                if(array[j]<array[min_idx]){
                    min_idx=j;
                    await waitforme(50);
                }
                ele[j].style.background = `${PrimaryColor}`;
            }
            swap(array,min_idx,i);
            ele[i].style.background = `${PrimaryColor}`;
            this.setState({array})
        }
        this.setState({array})
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
                <div className='footer-container'>
                    <button onClick={()=>this.randomArray()} className="button">Reset</button>
                    <button onClick={()=>this.bubbleSort()} className="button">Bubble Sort</button>
                    <button onClick={()=>this.selectionSort()} className="button">Selection Sort</button>
                </div>
            </div>
        );
    }
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

function swap(arr,x,y){
    let temp=arr[x];
    arr[x]=arr[y];
    arr[y]=temp;
}
export default Sort;