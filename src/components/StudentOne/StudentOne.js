import CustomTextField from '../CustomFields/CustomTextField';
import React from 'react';
import './StudentOne.css';

const studentOne = (props) => {
  const { studentOne } = props;

  return (
    <div className="student-one">
      <div>
        {
          studentOne.winner ? 
          <span style={{color: 'blue'}}> WINNER! </span>
          : 
          "Student One"
        }
      </div>
        
      <CustomTextField
        disabled
        id="outlined-read-only-s1name"
        label="Name"
        value={studentOne.name}
      />

      <img className="s1-pic" alt='s1-pic'
        src={studentOne.pictureUrl} 
      />

      <CustomTextField
        disabled
        id="outlined-read-only-s1HP"
        label="HP"
        variant="outlined"
        value={studentOne.HP}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-s1DPS"
        label="DPS"
        variant="outlined"
        value={studentOne.DPS}
      />
    </div>
  )
}

export default studentOne;