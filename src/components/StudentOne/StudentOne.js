import CustomTextField from '../CustomFields/CustomTextField';
import React from 'react';

const studentOne = (props) => {
  const { studentOne } = props;

  return (
    <div className="student-one">
      <span>{studentOne.winner ? "WINNER!" : "Student One"}</span>
        
      <CustomTextField
        disabled
        id="outlined-read-only-s1name"
        label="Name"
        value={studentOne.name}
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