import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = (props) => {

  return (
    <div className="welcome-contain">
      <h2>Welcome</h2>
        <Link to='/login'>Login</Link>
        <br/>
        <Link to="/register">Register</Link>
    </div>
  );
}

export default Welcome;