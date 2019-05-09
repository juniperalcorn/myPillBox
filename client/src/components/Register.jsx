import React from 'react';

const Register = (props) => {

  return (
    <div className="auth-container">
      <h2 className='viewPill-h2'>Register</h2>
      <div className='registerForm'>
        <form onSubmit={props.handleRegister} >
          <div className='register-div'><span className='login-p'>Username:</span> <span className='login-field'><input className='add-pill-input' name="username" type="text" value={props.formData.username} onChange={props.handleChange} /></span></div>
          <br/>
          <div className='register-div'><span className='login-p'>Email:</span> <span className='login-field'><input className='add-pill-input' name="email" type="text" value={props.formData.email} onChange={props.handleChange} /></span></div> 
          <br/>
          <div className='register-div'> <span className='login-p'>Password:</span> <span className='login-field'><input className='add-pill-input' name="password" type="password" value={props.formData.password} onChange={props.handleChange} /></span></div>
          <br/>
          <button className='headerButton'>Register Now</button>
        </form>
      </div>
      <p className='login-p'>or</p>
      <button className='headerButton auth' onClick={()=>props.switchToLogin()}>Go To Login</button>
    </div>
  );
}

export default Register;