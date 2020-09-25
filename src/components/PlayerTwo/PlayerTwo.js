import CustomTextField from '../CustomTextField';
import React from 'react';

const PlayerTwo = (props) => {
  const { playerTwo } = props;

  return (
    <div className="player-two">
      <span>Player Two</span>

      <CustomTextField
        disabled
        id="outlined-read-only-p2name"
        label="Name"
        value={playerTwo.name}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-p2HP"
        label="HP"
        variant="outlined"
        value={playerTwo.HP}
      />

      <CustomTextField
        disabled
        id="outlined-read-only-p2DPS"
        label="DPS"
        variant="outlined"
        value={playerTwo.DPS}
      />
    </div>
  )
}

export default PlayerTwo;