//packages
import React, {Component} from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import decode from 'jwt-decode'

//api
import { loginUser, registerUser } from './services/api-helper'

//components
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'

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

    }
    //bind functions here
    this.handleAuthChange=this.handleAuthChange.bind(this)
    this.handleRegister=this.handleRegister.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLoginButton=this.handleLoginButton.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    // this.handleFormChange=this.handleFormChange.bind(this)
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt')
    if (token) {
      const userData = decode(token)
      this.setState({
        currentUser: userData
      })
    }
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


  render(){
    return (
      <div className="App">
        <Route exact path='/' render={()=> (
          <Welcome/>
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
