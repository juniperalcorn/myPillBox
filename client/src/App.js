//packages
import React, {Component} from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'
import decode from 'jwt-decode'

//api
import { loginUser, registerUser, getPills, getDose, createDose, updateDose, deleteDose } from './services/api-helper'

//components
import Welcome from './components/Welcome'
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
      pillBox:{
        am: 'Morning',
        am_dose: 'am_dose',
        mid: 'Midday',
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
      selectedPill:{
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
  }

  componentDidMount(){
    this.showPills()
    this.getDoses()
    const token = localStorage.getItem('jwt')
    if (token) {
      this.setDate()
      this.setTime()
      const userData = decode(token)
      this.setState({
        currentUser: userData
      })
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

//-----NAVIGATION
showInstructions(){
  this.props.history.push('/instructions')
}
returnHome(){
  this.props.history.push('/')
}
goToNewPill(){
  this.props.history.push('/create-new')
}

//-------API
async getDoses() {
  const doses = await getDose(this.state.currentUser.user_id)
  this.setState({
    doses
  })
}

async newDose(e){
  e.preventDefault()
  const newDose = await createDose(this.state.selectedPill, this.state.currentUser.user_id)
  this.setState(prevState=>({
    doses: [...prevState.doses, newDose],
    selectedPill:{
      pill_id: null,
      am_dose:'',
      mid_dose:'',
      pm_dose:'',
      bed_dose:'',
    }
  }))
}

async updateDoseForm(e, doseId){
  e.preventDefault()
  const doseUpdate = await updateDose(this.state.selectedPill, this.state.currentUser.user_id, doseId)
  this.setState(prevState=>({
    doses: prevState.doses.map(el=> el.id === doseId ? doseUpdate : el),
    selectedPill:{
      pill_id: null,
      am_dose:'',
      mid_dose:'',
      pm_dose:'',
      bed_dose:'',
    }
  }))
}

updateFormPillSelect(params){
  const paramsId = parseInt(params)
  this.setState({
    selectedPill:{
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
    selectedPill: {
      pill_id: parseInt(e.target.value)
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

        <Switch>
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
          <Route exact path='/midday' render={()=> (
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
              selectedPill={this.state.selectedPill}
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
