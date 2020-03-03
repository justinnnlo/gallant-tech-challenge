import React from 'react';
import DogGrid from './DogGrid';

const Dog = (props) => {
  const dogList = [];
  const dogPropsKeys = Object.keys(props.dogInfos);
  console.log('in dog storage', window.localStorage.getItem('dogInfoInCache'));
  
  for(let i = 0; i < dogPropsKeys.length; i++) {
    let splittedfilteredData = props.filteredData.replace(/ /g, '').split(',');
    if(splittedfilteredData.includes(dogPropsKeys[i])) {
      const correspondingNames = props.dogInfos[dogPropsKeys[i]];
      for(let j = 0; j < correspondingNames.length; j++) {
        dogList.push(<DogGrid className='flex-dog-grid-child' breedName={dogPropsKeys[i]} dogName={correspondingNames[j]} index ={j}/>);
      }
    }
  }
  
  return(
    <div className='dog-card'> 
       {dogList}
    </div>
  )
}

export default Dog;