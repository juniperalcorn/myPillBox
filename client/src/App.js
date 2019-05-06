//packages
import React, {Component} from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import decode from 'jwt-decode'

//api
import { loginUser, registerUser, getDose } from './services/api-helper'

//components
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Instructions from './components/Instructions'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      authFormData:{
        username:'',
        email: '',
        password: '',
      },
      formData: {
        name:'',
      },
      currentUser:{
      },
      doses:[],
      date: '',
      time: '',
    }
    //bind functions here
    this.handleAuthChange=this.handleAuthChange.bind(this)
    this.handleRegister=this.handleRegister.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLoginButton=this.handleLoginButton.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    this.showInstructions=this.showInstructions.bind(this)
    this.setDate=this.setDate.bind(this)
    this.setTime=this.setTime.bind(this)
    // this.handleFormChange=this.handleFormChange.bind(this)
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt')
    if (token) {
      const userData = decode(token)
      this.setState({
        currentUser: userData
      })
      this.setDate()
      this.setTime()

    }
  }

  setDate(){
    let weekDay = new Date().getDay()
    const day = new Date().getDate()
    let month = new Date().getMonth() +1
    
    if (month===1){
      month = 'January'
    } else if (month===2){
      month = 'February'
    } else if (month===3){
      month = 'March'
    } else if (month===4){
      month = 'April'
    } else if (month===5){
      month = 'May'
    } else if (month===6){
      month = 'June'
    } else if (month===7){
      month = 'July'
    } else if (month===8){
      month = 'August'
    } else if (month===9){
      month = 'September'
    } else if (month===10){
      month = 'October'
    } else if (month===11){
      month = 'Novebmer'
    } else {
      month = 'December'
    }

    if (weekDay === 0 ){
      weekDay = 'Sunday'
    } else if (weekDay === 1) {
      weekDay = 'Monday'
    } else if (weekDay === 2) {
      weekDay = 'Tuesday'
    } else if (weekDay === 3) {
      weekDay = 'Wednesday'
    } else if (weekDay ===4) {
      weekDay = 'Thursday'
    } else if (weekDay === 5) {
      weekDay = 'Friday'
    } else {weekDay = 'Saturday'}

    this.setState({
      date: weekDay + ' ' + month + ' ' + day
    })
  }

  setTime(){
    let time = new Date().getHours()
    if (time <= 11){
      time = 'Morning'
    } else if (time >11 && time<=16){
      time = 'Midday'
    } else if (time >16 && time <=20){
      time = 'Evening'
    } else {time = 'Bed'}
    this.setState({
      time
    })
  }


// handleFormChange(e){
//   const {name, value} = e.target
//   this.setState(prevState=>({
    
//   }))
// }

  //-------LOGIN AND REGISTER
handleLoginButton(){
  this.props.history.push('/login')
}

async handleLogin(){
  const userData = await loginUser(this.state.authFormData)
  this.setState({
    currentUser: decode(userData.token)
  })
  localStorage.setItem('jwt', userData.token)
}

async handleRegister(e) {
  e.preventDefault()
  await registerUser(this.state.authFormData)
  this.handleLogin()
}

handleLogout(){
  localStorage.removeItem('jwt')
  this.setState({
    currentUser:null
  })
}

handleAuthChange(e){
  const {name, value}=e.target
  this.setState(prevState=>({
    authFormData: {
      ...prevState.authFormData,
      [name]:value
    }
  }))
}

//-----HELPERS
showInstructions(){
  this.props.history.push('/instructions')
}

//-------GET USER INFO
async getDoses() {
  const doses = await getDose(this.state.currentUser.user_id)
  this.setState({
    doses
  })
}


  render(){
    return (
      <div className="App">
        <header>
          <div>
            {this.state.currentUser
              ?
              <>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.showInstructions}>How To Use This App</button>
                <p>Welcome {this.state.currentUser.username}</p>
                <p>{this.state.date}, {this.state.time}</p>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>








        <Route exact path='/' render={()=> (
          <Welcome/>
        )}/> 
        <Route exact path='/instructions' render={()=> (
          <Instructions/>
        )}/> 
        <Route exact path='/register' render={() => (
          <Register 
          handleRegister={this.handleRegister}
          handleChange={this.handleAuthChange}
          formData={this.state.authFormData}
          />
        )} />

        <Route exact path='/login' render={() => (
          <Login 
          handleLogin={this.handleLogin}
          handleChange={this.handleAuthChange}
          formData={this.state.authFormData}
          />
        )}/>
      </div>
    );
  }
}

export default App;
