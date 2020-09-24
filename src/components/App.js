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
      dialogMessage: ""
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
    
  }

  render () {
    const {dialogOpen, dialogMessage} = this.state;

    return (
      
      <div className="App">
        <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

        <div>
          ALIVE
        </div>

      </div>
    )
  }
}

export default App;
