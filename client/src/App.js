//packages
import React, {Component} from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'
import decode from 'jwt-decode'

//api
import { loginUser, registerUser, getPills, getDose, createDose, updateDose, deleteDose, getUserInfo } from './services/api-helper'

//components
import Register from './components/Register'
import Login from './components/Login'
import Instructions from './components/Instructions'
import Pillbox from './components/Pillbox'
import AddPill from './components/AddPill'
import Doses from './components/Doses'
import ViewPill from'./components/ViewPill'
import UpdateDose from './components/UpdateDose'

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
      isLoggedIn: false,
      isRegister:false,
      pillBox:{
        am: 'Morning',
        am_dose: 'am_dose',
        mid: 'Noon',
        mid_dose: 'mid_dose',
        pm: 'Evening',
        pm_dose: 'pm_dose',
        bed: 'Bed',
        bed_dose:'bed_dose'
      },
      doses:[],
      date: '',
      time: '',
      pills:[],
      dose:{
        pill_id:null,
        am_dose:'',
        mid_dose:'',
        pm_dose:'',
        bed_dose:'',
      },
      pillToView:null,
      updateInfo:{
        dose_id:null,
        am_dose:'',
        mid_dose:'',
        pm_dose:'',
        bed_dose:'',
      }
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
    this.getDoses=this.getDoses.bind(this)
    this.choosePillToView=this.choosePillToView.bind(this)
    this.updateFormPillSelect=this.updateFormPillSelect.bind(this)
    this.destroyDose=this.destroyDose.bind(this)
    this.updateDoseForm=this.updateDoseForm.bind(this)
    this.switchLoginToRegister=this.switchLoginToRegister.bind(this)
    this.switchRegisterToLogin=this.switchRegisterToLogin.bind(this)

    this.getUser=this.getUser.bind(this)
  }

  async componentDidMount(){
    this.showPills()
    const token = await localStorage.getItem('jwt')
    if (token) {
      await this.setDate()
      await this.setTime()
      const userData = await decode(token)
      this.setState({
        currentUser: userData,
        isLoggedIn:true
      })
      this.getDoses()
      this.getUser()
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

  //-------LOGIN AND REGISTER
handleLoginButton(){
  this.props.history.push('/login')
}

switchLoginToRegister(){
  this.setState({isRegister: true})
}
switchRegisterToLogin(){
  this.setState({isRegister: false})
}

async handleLogin(){
  const userData = await loginUser(this.state.authFormData)
  this.setState({
    currentUser: decode(userData.token),
    isLoggedIn: true,
  })
  localStorage.setItem('jwt', userData.token)
  this.props.history.push('/home')
}

async handleRegister(e) {
  e.preventDefault()
  await registerUser(this.state.authFormData)
  this.setState({isRegister:false})
  this.handleLogin()
}

handleLogout(){
  localStorage.removeItem('jwt')
  this.setState({
    currentUser:null,
    isLoggedIn: false,
  })
  this.props.history.push('/')
  window.location.reload()
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

//-----NAVIGATION
showInstructions(){
  this.props.history.push('/instructions')
}
returnHome(){
  this.props.history.push('/home')
}
goToNewPill(){
  this.props.history.push('/create-new')
}

//-------API
async getDoses() {
  const doses = await getDose(this.state.currentUser.user_id)
  console.log('getDoses app.js', doses)
  const userDoses = doses.filter(dose=>dose.user_id === this.state.currentUser.user_id)
  console.log('user doses', userDoses)
  this.setState({
    doses:userDoses
  })
}

async getUser(){
  const user = await getUserInfo(this.state.currentUser.user_id)
  console.log('get user in app.js', user.doses)
}

async newDose(e){
  e.preventDefault()
  const newDose = await createDose(this.state.dose, this.state.currentUser.user_id)
  this.setState(prevState=>({
    doses: [...prevState.doses, newDose],
    dose:{
      pill_id: null,
      am_dose:'',
      mid_dose:'',
      pm_dose:'',
      bed_dose:'',
    }
  }))
}

async updateDoseForm(userId, doseId){
  const doseUpdate = await updateDose(this.state.dose, userId, doseId)
  this.setState(prevState=>({
    doses: prevState.doses.map(el=> el.id === doseId ? doseUpdate : el),
    dose:{
      pill_id: null,
      am_dose:'',
      mid_dose:'',
      pm_dose:'',
      bed_dose:'',
    }
  }))
  window.location.reload()
}

updateFormPillSelect(params){
  const paramsId = parseInt(params)
  this.setState({
    dose:{
      pill_id: paramsId
    }
  })
}

async showPills(){
  const pills = await getPills()
  this.setState({ pills })
}

pillForm(e){
  this.setState({
    dose: {
      pill_id: parseInt(e.target.value)
    }
  })
}

handlePillChange(e){
  const {name, value}=e.target
  this.setState(prevState=>({
    dose: {
      ...prevState.dose,
      [name]:value
    }
  }))
}

choosePillToView(e){
  this.setState({
    pillToView: e.target.value
  })
}

async destroyDose(doseId){
  const destroyDose = await deleteDose(this.state.currentUser.user_id, doseId)
  this.setState(prevState=>({
    doses: prevState.doses.filter(el => el.id !== doseId)
  }))
  this.props.history.push('/')
}

  render(){
    return (
      <div className="App">
        <header>
          <div className='login'>
            {this.state.isLoggedIn
              ?
              <>
                <div className='top-page'>
                <div className='headerButton-contain'>
                  <button className='headerButton' onClick={this.handleLogout}>Logout</button>
                  <button className='headerButton' onClick={()=>(this.props.history.push('/home'))}>Pill Box</button>
                  <button className='headerButton' onClick={this.showInstructions}>How To Use This App</button>
                  <button className='createNew headButt' onClick={this.createNew}>Add New Pill</button>
                </div>
                <div className='title'>myPillBox</div>
                </div>
                <div className='headerP-contain'>
                  <div className='headerP'>Welcome, {this.state.currentUser.username} !</div>
                  <div className='headerP'>{this.state.date}, {this.state.time}</div>
                </div>
              </>
              :
              <div className='welcome-Contain'>
                <h2 className='welcome-h2'>Welcome To myPillBox!</h2>
                <p className='welcome-p'>Login or Register to keep track of your daily medications.</p>
              </div>
            }
          </div>
        </header>

        <Switch>
          <Route exact path='/' render={()=> (
            this.state.isRegister 
            ?
            <div className='login-contain'>
            <Register 
            handleRegister={this.handleRegister}
            handleChange={this.handleAuthChange}
            formData={this.state.authFormData}
            switchToLogin={this.switchRegisterToLogin}
            />
            </div>
            :
            <div className='login-contain'>
              <Login
                handleLogin={this.handleLogin}
                handleChange={this.handleAuthChange}
                formData={this.state.authFormData}
                switchToRegister={this.switchLoginToRegister}
              />
            </div>  
          )}/> 

          <Route exact path='/home' render={()=>(
            <Pillbox createNew={this.goToNewPill}/>
          )}/>

          <Route exact path='/instructions' render={()=> (
            <Instructions />
          )}/> 
          <Route exact path='/morning' render={()=> (
            <Doses 
            header={this.state.pillBox.am}
            filter={this.state.pillBox.am_dose}
            doses={this.state.doses}
            pills={this.state.pills}
            onClick={this.choosePillToView}/>
          )}/> 
          <Route exact path='/noon' render={()=> (
            <Doses 
            header={this.state.pillBox.mid}
            filter={this.state.pillBox.mid_dose}
            doses={this.state.doses}
            pills={this.state.pills}
            onClick={this.choosePillToView}/>
          )}/> 
          <Route exact path='/evening' render={()=> (
            <Doses 
            header={this.state.pillBox.pm}
            filter={this.state.pillBox.pm_dose}
            doses={this.state.doses}
            pills={this.state.pills}
            onClick={this.choosePillToView}/>
          )}/> 
          <Route exact path='/bed' render={()=> (
            <Doses 
            header={this.state.pillBox.bed}
            filter={this.state.pillBox.bed_dose}
            doses={this.state.doses}
            pills={this.state.pills}
            onClick={this.choosePillToView}/>
          )}/> 

          <Route exact path='/create-new' render={()=>(
            <AddPill 
              pills={this.state.pills}
              toggleItem={this.toggleSelected}
              selectedPill={this.state.dose}
              handleSelect={this.pillForm}
              handleChange={this.handlePillChange}
              newDose={this.newDose}
            />
          )}/>

          <Route path='/viewpill/:id' render={(props)=>(
            <ViewPill
              {...props}
              pills={this.state.pills}
              doses={this.state.doses}
              getDoses={this.getDoses}
              currentUser={this.state.currentUser.user_id}
              destroyDose={this.destroyDose}
              updateDose={this.updateDoseForm}
              handleChange={this.handlePillChange}
              dose={this.state.dose}
              pillId={this.updateFormPillSelect}
            />
          )}/>
          
          <Route path='updatedose/pill/:id' render={(props)=>(
            <UpdateDose 
            {...props}
            pills={this.state.pills}
            doses={this.state.doses}
            getPillId={this.updateFormPillSelect}
            />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
