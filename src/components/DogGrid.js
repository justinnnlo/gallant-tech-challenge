import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogGrid = (props) => {
  const [imageURLs, pushImageURLs] = useState([]);

  useEffect(() => {
    axios.get(`https://dog.ceo/api/breed/${props.breedName}/images`)
    .then(resp => {
      console.log('in use effect', resp);
      pushImageURLs(resp.data.message);
    })
  }, []); 
  
  return(
    <div className='dog-one-card'> 
      <div className='dog-name'>{props.dogName}</div>
      <img src={imageURLs[props.index]}/>
    </div>
  )
}



export default DogGrid;