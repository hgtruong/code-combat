import React from 'react';
import axios from 'axios';
import Student from '../models/Student'
import DialogSpinner from '../utils/dialogSpinner';
import randomizer from '../utils/randomizer';
import StudentOne from './StudentOne/StudentOne';
import StudentTwo from './StudentTwo/StudentTwo';

import { 
  Button
} from "@material-ui/core";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      dialogOpen: false,
      dialogMessage: "",
      studentOne: new Student(),
      studentTwo: new Student(),
      firstRandomNum: null,
      secondRandomNum: null,
      winner: new Student()
    }

    this.handleCompeteClick = this.handleCompeteClick.bind(this);
    this.handleRandomizeClick = this.handleRandomizeClick.bind(this);
  }

  componentDidMount() {
    let endPoint = `https://jsonplaceholder.typicode.com/users`;
    
    this.setState({dialogOpen: true, dialogMessage: "Getting students"}, async () => {
      try {
        let result = await axios ({
          url: `${endPoint}`,
          method: "GET"
        });
        result.data.forEach(async (student) => {
          let newStudent = new Student(student);
          await this.setState({students: [...this.state.students, newStudent]});
        });
        this.randomizeStudent(true, true);
        this.setState({dialogOpen: false});
      } catch (error) {
        console.log(`Error getting users. ${error}`)
      }
    });
  }

  //TODO: Work on randomize player clicked
  //TODO: Need to remove playerUsed properties in player model
  randomizeStudent(studentOne, studentTwo) {
    let {students} = this.state;
    let studentsALen = students.length;

    if(studentOne && studentTwo) {

      // generate two random number 
      let firstNum  = randomizer(0, studentsALen - 1, 1);
      let secondNum = randomizer(0, studentsALen - 2, 1);

      // Ensure no same two random number
      if (secondNum >= firstNum) ++secondNum;

      this.setState({
        firstRandomNum: firstNum,
        secondRandomNum: secondNum
      }, async () => {
        await this.setState({
          studentOne: students[this.state.firstRandomNum],
          studentTwo: students[this.state.secondRandomNum]
        });
      });
    } else if (studentOne) {
      // set up studentOne for random btn
    } else {
      // set up studentTwo for random btn
    }
  }

  handleRandomizeClick (event) {
    // True === studentOne, False === studentTwo
    let studentToRandomize = event.currentTarget.value;
    studentToRandomize ? this.randomizeStudent(true, false) : this.randomizeStudent(false, true);
    
  }

  handleCompeteClick () {
    let { studentOne, studentTwo } = this.state;

    this.setState({dialogOpen: true, dialogMessage: "Deciding Winner!"}, async () => {
      let studentOneHP = studentOne.HP;
      let studentTwoHP = studentTwo.HP;
    
      let studentOneDPS = studentOne.DPS;
      let studentTwoDPS = studentTwo.DPS;
  
      let studentOneCheerTime = Math.floor((studentOneHP/studentTwoDPS) * -1);
      let studentTwoCheerTime = Math.floor((studentTwoHP/studentOneDPS) * -1);
    
      if(studentOneCheerTime === studentTwoCheerTime) {
        await this.setState({ winner: null });
      } else {
        await this.setState({ winner: studentOneCheerTime > studentTwoCheerTime ? studentTwo : studentOne })
      }
      await this.setState({dialogOpen: false});
    });
  }

  render () {
    const {dialogOpen, dialogMessage, studentOne, studentTwo} = this.state;

    return (
      
      <div className="App">
        <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

        <div className="battle-ground">

          <div>
            <StudentOne studentOne={studentOne}/>
            <Button 
              variant="contained" 
              color="primary"
              value={true}
              onClick={this.handleRandomizeClick}
            >
              Randomize!
            </Button>
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

          <div>
            <StudentTwo studentTwo={studentTwo}/>
            <Button 
              variant="contained" 
              color="primary"
              value={false}
              onClick={this.handleRandomizeClick}
            >
              Randomize!
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
