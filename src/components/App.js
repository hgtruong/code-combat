import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const endPoint = `https://jsonplaceholder.typicode.com/users`;

    try {
      const result = await axios ({
        url: `${endPoint}`,
        method: "GET"
      });
      this.setState({users: result.data});
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
