import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import './CSS/sort.css';
const PrimaryColor='#EDEDED';
const SecondaryColor='#DA0037';

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

    async insertionSort(){
        let i,j,key;
        const array=this.state.array;
        const ele=document.querySelectorAll(".div-bar")
        for(i=1;i<array.length;i++){
            key=array[i];
            j=i;
            ele[i].style.background = `${SecondaryColor}`;
            while(array[j-1]>key && j>=1){
                ele[j].style.background = `${SecondaryColor}`;
                array[j]=array[j-1];
                await waitforme(20);
                ele[j].style.background = `${PrimaryColor}`;
                ele[i].style.background = `${SecondaryColor}`;
                j--;
            }
            array[j]=key;
            ele[i].style.background = `${PrimaryColor}`;
            this.setState({array});
        }
        this.setState({array});
    }

    async shellSort(arr)
    {
        let n = arr.length;
        const ele=document.querySelectorAll(".div-bar")
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
        {
            for (let i = gap; i < n; i += 1)
            {
                let temp = arr[i];
                ele[i].style.background = `${SecondaryColor}`;
                let j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap){
                    ele[j].style.background = `${SecondaryColor}`;
                    ele[j-gap].style.background = `${SecondaryColor}`;
                    arr[j] = arr[j - gap];
                    this.setState({array:arr});
                    await waitforme(30);
                    ele[j].style.background = `${PrimaryColor}`;
                    ele[j-1].style.background = `${PrimaryColor}`;
                }
                arr[j] = temp;
                this.setState({array:arr});
                await waitforme(30);
                ele[i].style.background = `${PrimaryColor}`;
            }
        }
        this.setState({array:arr});
    }
    
    // mergeSort(ele,array,l,r){
    //     if(l>=r){
    //         return;
    //     }
    //     let mid=l+parseInt((r-l)/2);
    //     this.mergeSort(ele,array,l,mid);
    //     this.mergeSort(ele,array,mid+1,r);
    //     this.merge(ele,array,l,mid,r);
    // }

    // merge(ele,array,l,m,r){
    //     let n1=m-l+1,n2=r-m;
    //     var arr1=new Array(n1);
    //     var arr2=new Array(n2);
    //     for(let i=0;i<n1;i++){
    //         arr1[i]=array[l+i];
    //     }
    //     for(let i=0;i<n2;i++){
    //         arr2[i]=array[m+1+i];
    //     }
    //     let i=0,j=0,k=l;
    //     while(i<n1 && j<n2){
    //         if(arr1[i]<=arr2[j]){
    //             array[k]=arr1[i];
    //             i++;
    //         }else{
    //             array[k]=arr2[j];
    //             j++;
    //         }
    //         setTimeout(startTimer,20);
    //         this.setState({array});
    //         k++;
    //     }

    //     while(i<n1){
    //         array[k]=arr1[i];
    //         i++;k++;
    //     }
    //     while(j<n2){
    //         array[k]=arr2[j];
    //         j++;k++;
    //     }
    //     this.setState({array});               
    // }

    render() {
        const {array}=this.state;
        return(
            <div>
                <div className="header">
                    <h1>Sorting Visualizer</h1>
                </div>
                <div className="bar-container">
                    {array.map((val,key)=>(
                        <div key={key} className="div-bar" style={{backgroundColor:`${PrimaryColor}`, height:`${val}px`}}></div>
                    ))}
                </div>
                <div className='footer-container'>
                    <button onClick={()=>this.randomArray()} className="button">Reset</button>
                    <button onClick={()=>this.bubbleSort()} className="button">Bubble Sort</button>
                    <button onClick={()=>this.selectionSort()} className="button">Selection Sort</button>
                    <button onClick={()=>this.insertionSort()} className="button">Insertion Sort</button>
                    <button onClick={()=>this.shellSort(this.state.array)} className="button">Shell Sort</button>
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