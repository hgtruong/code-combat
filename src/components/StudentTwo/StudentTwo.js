import CustomTextField from '../CustomFields/CustomTextField';
import React from 'react';
import './StudentTwo.css';

const StudentTwo = (props) => {
  const { studentTwo } = props;

  return (
    <div className="student-two">
      <div>
        {
          studentTwo.winner ? 
          <span style={{color: 'blue'}}> WINNER! </span>
          :
          "Student Two"
        }
      </div>

      <CustomTextField
        disabled
        id="outlined-read-only-s2name"
        label="Name"
        value={studentTwo.name}
      />

      <img className="s2-pic" alt='s2-pic'
        src={studentTwo.pictureUrl}      
      />
      
      <CustomTextField
        disabled
        id="outlined-read-only-s2HP"
        label="HP"
        variant="outlined"
        value={studentTwo.HP}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-s2DPS"
        label="DPS"
        variant="outlined"
        value={studentTwo.DPS}
      />
    </div>
  )
}

export default StudentTwo;