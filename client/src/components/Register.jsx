import React from 'react';

const Register = (props) => {

  return (
    <div className="auth-container">
      <h2 className='viewPill-h2'>Register</h2>
      <form onSubmit={props.handleRegister} >
        <p className='login-p'>Username: <input className='add-pill-input' name="username" type="text" value={props.formData.username} onChange={props.handleChange} /></p>
        <p className='login-p'>Email: <input className='add-pill-input' name="email" type="text" value={props.formData.email} onChange={props.handleChange} /></p> 
        <p className='login-p'>Password: <input className='add-pill-input' name="password" type="password" value={props.formData.password} onChange={props.handleChange} /></p>
        <br/>
        <button className='headerButton'>Register Now</button>
      </form>
      <p className='login-p'>or</p>
      <button className='headerButton' onClick={()=>props.switchToLogin()}>Go To Login</button>
    </div>
  );
}

export default Register;