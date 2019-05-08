import React from 'react'

const Login = (props) => {

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p>Username: <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} /></p>
        <p>Password: <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} /></p>
        <br/>
        <button className='headerButton'>Login</button>
      </form>
    </div>
  );
}

export default Login;