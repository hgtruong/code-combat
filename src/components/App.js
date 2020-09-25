import React from 'react';
import axios from 'axios';
import Player from '../models/Player'
import DialogSpinner from '../utils/dialogSpinner';
import randomizer from '../utils/randomizer';
import { 
  TextField,
  withStyles,
  Button
} from "@material-ui/core";
import './App.css';

const CustomTextField = withStyles({
  root: {
    margin: "10px 10px",
    variant: "outlined",
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "black"
    }
  }
})(TextField);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      dialogOpen: false,
      dialogMessage: "",
      playerOne: new Player(),
      playerTwo: new Player(),
      firstRandomNum: null,
      secondRandomNum: null,
      winner: new Player()
    }

    this.handleCompeteClick = this.handleCompeteClick.bind(this);
  }

  componentDidMount() {
    let endPoint = `https://jsonplaceholder.typicode.com/users`;
    
    this.setState({dialogOpen: true, dialogMessage: "Getting players"}, async () => {
      try {
        let result = await axios ({
          url: `${endPoint}`,
          method: "GET"
        });
        result.data.forEach(async (player) => {
          let newPlayer = new Player(player);
          await this.setState({players: [...this.state.players, newPlayer]});
        });
        this.randomizePlayers(true, true);
        this.setState({dialogOpen: false});
      } catch (error) {
        console.log(`Error getting users. ${error}`)
      }
    });
  }

  randomizePlayers(playerOne, playerTwo) {
    let {players} = this.state;
    let playersALen = players.length;

    if(playerOne && playerTwo) {
      // generate two random number 
      let firstNum  = randomizer(0, playersALen - 1, 1);
      let secondNum = randomizer(0, playersALen - 2, 1);

      // Ensure no same two random number
      if (secondNum >= firstNum) ++secondNum;

      this.setState({
        firstRandomNum: firstNum,
        secondRandomNum: secondNum
      }, async () => {
        await this.setState({
          playerOne: players[this.state.firstRandomNum],
          playerTwo: players[this.state.secondRandomNum]
        });
      });
    } else if (playerOne) {
      // set up playerOne for random btn
    } else {
      // set up playerTwo for random btn
    }
  }

  handleCompeteClick () {
    let { playerOne, playerTwo } = this.state;

    this.setState({dialogOpen: true, dialogMessage: "Deciding Winner!"}, async () => {
      let playerOneHP = playerOne.HP;
      let playerTwoHP = playerTwo.HP;
    
      let playerOneDPS = playerOne.DPS;
      let playerTwoDPS = playerTwo.DPS;
  
      let playerOneCheerTime = Math.floor((playerOneHP/playerTwoDPS) * -1);
      let playerTwoCheerTime = Math.floor((playerTwoHP/playerOneDPS) * -1);
    
      if(playerOneCheerTime === playerTwoCheerTime) {
        await this.setState({ winner: null });
      } else {
        await this.setState({ winner: playerOneCheerTime > playerTwoCheerTime ? playerTwo : playerOne })
      }
      await this.setState({dialogOpen: false});
    });
  }

  render () {
    const {dialogOpen, dialogMessage, playerOne, playerTwo} = this.state;

    return (
      
      <div className="App">
        <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

        <div className="battle-ground">

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

          <div className="compete-btn">
          <Button 
            variant="contained" 
            color="secondary"
            onClick={this.handleCompeteClick}
          >
            Compete!
          </Button>
          </div>

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

        </div>

      </div>
    )
  }
}

export default App;
