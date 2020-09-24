import React from 'react';
import axios from 'axios';
import Player from '../models/Player'
import DialogSpinner from '../utils/dialogSpinner';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      dialogOpen: false,
      dialogMessage: "",
      playerOne: new Player(),
      playerTwo: new Player()
    }
  }

  componentDidMount() {
    const endPoint = `https://jsonplaceholder.typicode.com/users`;
    
    this.setState({dialogOpen: true, dialogMessage: "Getting players"}, async () => {
      try {
        const result = await axios ({
          url: `${endPoint}`,
          method: "GET"
        });
        result.data.forEach(async (player) => {
          const newPlayer = new Player(player);
          await this.setState({players: [...this.state.players, newPlayer]});
        });
        this.setState({dialogOpen: false});
      } catch (error) {
        console.log(`Error getting users. ${error}`)
      }
    });
  
    this.randomizePlayers(true, true);

  }

  randomizePlayers(playerOne, playerTwo) {
    if(playerOne && playerTwo) {
      
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
