import React from 'react';
import axios from 'axios';
import Player from '../models/Player'
import DialogSpinner from '../utils/dialogSpinner';
import randomizer from '../utils/randomizer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      dialogOpen: false,
      dialogMessage: "",
      playerOne: null,
      playerTwo: null,
      firstRandomNum: null,
      secondRandomNum: null
    }
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
      // set up playerOne
    } else {
      // set up playerTwo
    }
  }

  render () {
    const {dialogOpen, dialogMessage} = this.state;

    return (
      
      <div className="App">
        <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

        <div className="battle-ground">

          <div className="player-one">
            Player One


          </div>

          <div className="compete-btn">
            compete-btn
          </div>

          <div className="player-two">
            Player Two
          </div>

        </div>

      </div>
    )
  }
}

export default App;
