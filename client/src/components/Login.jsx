import React from 'react'

const Login = (props) => {

  return (
    <div className="auth-container">
      <h2 className='viewPill-h2'>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p className='login-p'>Username: <input className='add-pill-input' name="username" type="text" value={props.formData.username} onChange={props.handleChange} /></p>
        <p className='login-p'>Password: <input className='add-pill-input' name="password" type="password" value={props.formData.password} onChange={props.handleChange} /></p>
        <br/>
        <button className='headerButton'>Login Now</button>
      </form>
      <p className='login-p'>or</p>
      <button className='headerButton' onClick={()=>props.switchToRegister()}>Go To Register</button>
    </div>
  );
}

export default Login;