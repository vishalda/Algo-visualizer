import React from 'react';
import './Home.css';

class Home extends React.Component{

    changeLocation(loc){
        document.location=`/${loc}`;
    }

    render(){
        return(
            <div>
                <div className='header'><h1 >Algorithm-Visualizer</h1></div>
                <div  className='container'>
                    <div className='div-block' onClick={this.changeLocation.bind(this,'sort')}>
                        <div className='p-block'><h2>Sorting-Visualizer</h2></div>
                    </div>
                    <br/>
                    <div className='div-block' onClick={this.changeLocation.bind(this,'path-finding')}>
                        <div className='p-block'><h2>Path-Finding-Visualizer</h2></div>
                    </div>
                </div>
                <div className='footer'>
                    <a href="https://github.com/vishalda/Algo-visualizer"><button className='button'><i class='fa fa-github'></i> Github</button></a>
                </div>
            </div>
        )
    }
}

export default Home;