import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dog from './components/Dog';
import './index.css';

class PetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogInfos: {},
      filteredData: '' 
    }
    this.filterDogInfo = this.filterDogInfo.bind(this);
    this.setDogInfo = this.setDogInfo.bind(this);
    this.updateInputField = this.updateInputField.bind(this);
  }
  
  componentDidMount() {
    if(!window.localStorage.getItem('dogInfoInCache')) {
      console.log('im here');
      axios.get(`https://dog.ceo/api/breeds/list/all`)
      .then(resp => {
        console.log('getting data from server');
        window.localStorage.setItem("dogInfoInCache", JSON.stringify(resp.data.message));
        this.setDogInfo(this.filterDogInfo(resp.data.message));
      })
      .catch((err)=> {
        console.log(err);
      });
    }
    else {
      console.log('getting data from cache');
      const item = JSON.parse(window.localStorage.getItem("dogInfoInCache"));
      this.setDogInfo(this.filterDogInfo(item));
    }
    
  }

  setDogInfo = (dogBreeds) => {
    this.setState({ dogInfos: dogBreeds });
  }
  
  filterDogInfo = (dogResp) => {
    const filteredPetStore = {};
    let dogKeys = Object.keys(dogResp);
    for(let i = 0; i < dogKeys.length; i++) {
      if(dogResp[dogKeys[i]].length !== 0) {
        filteredPetStore[dogKeys[i]] = dogResp[dogKeys[i]];
      } 
    } 
    return filteredPetStore;
  }

  updateInputField = (e) => {
    this.setState({ filteredData: e.target.value });
  }
  
  render() {
    console.log('doginfo in state', this.state.dogInfos);
    return (
      <div className='container'>
        <h1 className="pet-container">Welcome to the Gallant Pet Search App!</h1>
        <input placeholder='Search for the breeds!'
        className='search-field' onChange={(e) => this.updateInputField(e)}></input>
        <Dog dogInfos={this.state.dogInfos} filterDogInfo={this.state.filterDogInfo} filteredData={this.state.filteredData}/>
      </div>
    )
  }
}

ReactDOM.render(<PetsContainer/>, document.querySelector('#root'));