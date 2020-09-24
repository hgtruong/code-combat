import React from 'react';
import axios from 'axios';
import Player from '../models/Player'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: []
    }
  }

  async componentDidMount() {
    const endPoint = `https://jsonplaceholder.typicode.com/users`;

    try {
      const result = await axios ({
        url: `${endPoint}`,
        method: "GET"
      });
      result.data.forEach(async (player) => {
        const newPlayer = new Player(player);
        await this.setState({players: [...this.state.players, newPlayer]});
      });
    } catch (error) {
      console.log(`Error getting users. ${error}`)
    }
  }

  render () {
    return (
      <div className="App">
          ALIVE
      </div>
    )
  }
}

export default App;
