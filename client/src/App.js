//packages
import React, {Component} from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'
import decode from 'jwt-decode'

//api
import { loginUser, registerUser, getPills, getDose, createDose } from './services/api-helper'

//components
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Instructions from './components/Instructions'
import Pillbox from './components/Pillbox'
import AddPill from './components/AddPill'

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
      pills:[],
      selectedPill:{
        pill_id:null,
        am_dose:null,
        mid_dose:null,
        pm_dose:null,
        bed_dose:null,
      },
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
    this.returnHome=this.returnHome.bind(this)
    this.goToNewPill=this.goToNewPill.bind(this)
    this.showPills=this.showPills.bind(this)
    this.pillForm=this.pillForm.bind(this)
    this.handlePillChange=this.handlePillChange.bind(this)
    this.newDose=this.newDose.bind(this)
    // this.handleFormChange=this.handleFormChange.bind(this)
  }

  componentDidMount(){
    this.showPills()
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
      month = 'November'
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
returnHome(){
  this.props.history.push('/')
}
goToNewPill(){
  this.props.history.push('/create-new')
}

//-------GET USER INFO
async getDoses() {
  const doses = await getDose(this.state.currentUser.user_id)
  this.setState({
    doses
  })
}

//------API
async newDose(e){
  e.preventDefault()
  const newDose = await createDose(this.state.selectedPill, this.state.currentUser.user_id)
  this.setState(prevState=>({
    doses: [...prevState.doses, newDose],
    selectedPill:{
      pill_id: '',
      am_dose:'',
      mid_dose:'',
      pm_dose:'',
      bed_dose:'',
    }
  }))
}

async showPills(){
  const pills = await getPills()
  this.setState({ pills })
}

pillForm(e){
  this.setState({
    selectedPill: {
      pill_id: e.target.value
    }
  })
}
handlePillChange(e){
  const {name, value}=e.target
  this.setState(prevState=>({
    selectedPill: {
      ...prevState.selectedPill,
      [name]:value
    }
  }))
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
                <button onClick={this.props.history.goBack}>Back</button>
                <button onClick={this.showInstructions}>How To Use This App</button>
                <p>Welcome {this.state.currentUser.username}</p>
                <p>{this.state.date}, {this.state.time}</p>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>


        {this.state.currentUser
        ?
        <>
          <Pillbox createNew={this.goToNewPill}/>
        </>
        :
        <>
          <Welcome/>
        </>
        }



       

        {/* <Route exact path='/' render={()=> (
          <Welcome/>
        )}/>  */}
        <Switch>
          <Route exact path='/instructions' render={()=> (
            <Instructions/>
          )}/> 

          <Route exact path='/create-new' render={()=>(
            <AddPill 
              pills={this.state.pills}
              toggleItem={this.toggleSelected}
              selectedPill={this.state.selectedPill}
              handleSelect={this.pillForm}
              handleChange={this.handlePillChange}
              newDose={this.newDose}
            />
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
