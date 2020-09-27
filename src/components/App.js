import React from 'react';
import axios from 'axios';
import Student from '../models/Student'
import DialogSpinner from '../utils/dialogSpinner';
import randomizer from '../utils/randomizer';
import StudentOne from './StudentOne/StudentOne';
import StudentTwo from './StudentTwo/StudentTwo';
import './App.css';
import { Button } from '@material-ui/core';

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
      isTie: false,
      isDisabled: false
    }

    this.handleCompeteClick = this.handleCompeteClick.bind(this);
    this.handleRandomizeClick = this.handleRandomizeClick.bind(this);
  }

  componentDidMount() {
    let usersEndPoint = `https://jsonplaceholder.typicode.com/users`;

    this.setState({dialogOpen: true, dialogMessage: "Setting Up!"}, async () => {
      try {
        let result = await axios ({
          url: `${usersEndPoint}`,
          method: "GET"
        });
        
        result.data.forEach(async (student) => {
          let newStudent = new Student(student);
          await this.setState({students: [...this.state.students, newStudent]});
        });

        this.randomizeStudent(true, true);
        this.setState({dialogOpen: false});
      } catch (error) {
        console.log(`Error getting students. ${error}`)
      }
    });
  }

  assignStudentPic (studentToBeAssigned) {
    let pictureEndPoint = `https://api.thecatapi.com/v1/images/search`;
    const { studentOne, studentTwo } = this.state;

    if (studentToBeAssigned === "One") {
      // Get 1st student picture
      let studentOnePic = axios ({
        url: `${pictureEndPoint}`,
        method: "GET",
      });

      studentOnePic.then((result) => {
        let s1Url = result.data[0].url;
        studentOne.pictureUrl = s1Url;
        this.setState({ studentOne });
      });
    } else if (studentToBeAssigned === "Two") {
      // Get second student picture
      let studentTwoPic = axios ({
        url: `${pictureEndPoint}`,
        method: "GET",
      });

      studentTwoPic.then((result) => {
        let s2Url = result.data[0].url;
        studentTwo.pictureUrl = s2Url;
        this.setState({ studentTwo });
      });
    } else {
      // Get 1st student picture
      let studentOnePic = axios ({
        url: `${pictureEndPoint}`,
        method: "GET",
      });

      studentOnePic.then((result) => {
        let s1Url = result.data[0].url;
        studentOne.pictureUrl = s1Url;
        this.setState({ studentOne });
      });

      // Get second student picture
      let studentTwoPic = axios ({
        url: `${pictureEndPoint}`,
        method: "GET",
      });

      studentTwoPic.then((result) => {
        let s2Url = result.data[0].url;
        studentTwo.pictureUrl = s2Url;
        this.setState({ studentTwo });
      });
    }
  }

  handleRandomizeClick (event) {
    const { studentOne, studentTwo } = this.state;
    // True === studentOne, False === studentTwo
    let studentToRandomize = event.currentTarget.value;

    this.setState({
      dialogOpen: true,
      dialogMessage: "Deciding Winner!",
      isTie: false,
      studentOne: {...studentOne, winner: false},
      studentTwo: {...studentTwo, winner: false}
    });

    studentToRandomize === "one" ? this.randomizeStudent(true, false) : this.randomizeStudent(false, true);
  }

  async randomizeStudent(sOne, sTwo) {
    let { students, firstRandomNum, secondRandomNum } = this.state;
    let studentsALen = students.length;
    let firstNum, secondNum = null;

    await this.setState({
      dialogOpen: true,
      dialogMessage: "Randomizing students",
      isDisabled: true
    });

    if(sOne && sTwo) {
      // generate two random number 
      firstNum  = randomizer(0, studentsALen - 1, 1);
      secondNum = randomizer(0, studentsALen - 2, 1);

      // No same two random number
      if (secondNum >= firstNum) ++secondNum;

      await this.setState({
        firstRandomNum: firstNum,
        secondRandomNum: secondNum,
        studentOne: students[firstNum],
        studentTwo: students[secondNum]
      });

      this.assignStudentPic();

    } else if (sOne) {
      // Randomizing first student
      firstNum = firstRandomNum;
      secondNum = secondRandomNum;
      let newFirstNum  = randomizer(0, studentsALen - 1, 1);

      await this.setState({studentOne: students[newFirstNum]});
      this.assignStudentPic("One");

    } else {
      // Randomizing second student
      firstNum = firstRandomNum;
      secondNum = secondRandomNum;
      let newSecondNum  = randomizer(0, studentsALen - 1, 1);

      await this.setState({studentTwo: students[newSecondNum]});
      this.assignStudentPic("Two");
    }

    this.setState({
      dialogOpen: false, 
      isDisabled: false
    });
  }

  handleCompeteClick () {
    let { studentOne, studentTwo } = this.state;
    
    this.setState({
      dialogOpen: true,
      dialogMessage: "Deciding Winner!",
      studentOne: {...studentOne, winner: false},
      studentTwo: {...studentTwo, winner: false}
    }, async () => {
      let studentOneHP = studentOne.HP;
      let studentTwoHP = studentTwo.HP;
    
      let studentOneDPS = studentOne.DPS;
      let studentTwoDPS = studentTwo.DPS;
  
      let studentOneCheerTime = Math.floor((studentOneHP/studentTwoDPS) * -1);
      let studentTwoCheerTime = Math.floor((studentTwoHP/studentOneDPS) * -1);
    
      if(studentOneCheerTime === studentTwoCheerTime) {
        await this.setState({ isTie: true });
      } else {
        if(studentOneCheerTime > studentTwoCheerTime) {
          await this.setState({ 
            studentTwo: {...studentTwo, winner: true} 
         });
        } else {
          await this.setState({ 
            studentOne: {...studentOne, winner: true} 
         });
        }
      }
      await this.setState({dialogOpen: false});
    });
  }

  render () {
    const {dialogOpen, dialogMessage, studentOne, studentTwo, isDisabled, isTie} = this.state;

    return (
      <div className="App">
        <DialogSpinner dialogOpen={dialogOpen} message={dialogMessage}/>

        <div className="battle-ground">

          <div>
            <StudentOne studentOne={studentOne}/>
            <Button 
              disabled={isDisabled}
              variant="contained" 
              color="primary"
              value="one"
              onClick={this.handleRandomizeClick}
            >
              Randomize!
            </Button>
          </div>
          
          <div className="compete-btn">
            <div style={{color: 'blue', margin: '45px 10px'}}>
              { isTie ? "TIE!" : ""}
              { 
                `${ !studentOne.winner && !studentTwo.winner ? 
                           '' : 
                           `Winner:
                            ${studentOne.winner ? 
                                studentOne.name :
                                studentTwo.name}`
                }`
              }
            </div>
            
              <Button
                disabled={isDisabled}
                variant="contained" 
                color="secondary"
                size="large"
                onClick={this.handleCompeteClick}
              >
                Compete!
              </Button>
          </div>

          <div>
            <StudentTwo studentTwo={studentTwo}/>
            <Button
              disabled={isDisabled}
              variant="contained" 
              color="primary"
              value="two"
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
