import CustomTextField from '../CustomFields/CustomTextField';
import React from 'react';

const StudentTwo = (props) => {
  const { studentTwo } = props;

  return (
    <div className="student-two">
      <span>{studentTwo.winner ? "WINNER!" : "Student Two"}</span>


      <CustomTextField
        disabled
        id="outlined-read-only-s2name"
        label="Name"
        value={studentTwo.name}
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