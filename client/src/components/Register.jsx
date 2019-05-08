import React from 'react';

const Register = (props) => {

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={props.handleRegister} >
        <p>Username: <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} /></p>
        <p>Email: <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} /></p> 
        <p>Password: <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} /></p>
        <br/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;