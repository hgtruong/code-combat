import CustomTextField from '../CustomTextField';
import React from 'react';

const PlayerOne = (props) => {
  const { playerOne } = props;

  return (
    <div className="player-one">
      <span>Player One</span>
        
      <CustomTextField
        disabled
        id="outlined-read-only-p1name"
        label="Name"
        value={playerOne.name}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-p1HP"
        label="HP"
        variant="outlined"
        value={playerOne.HP}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-p1DPS"
        label="DPS"
        variant="outlined"
        value={playerOne.DPS}
      />
    </div>
  )
}

export default PlayerOne;