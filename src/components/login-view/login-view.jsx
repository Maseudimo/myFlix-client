import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    < div className="main" >

    <input type="checkbox" id="chk" aria-hidden="true" />
    <div className="signup">
        <form>
            <label htmlFor="chk" aria-hidden="true">MyFlix</label>
            <input type="text" name="txt" placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} required="" />
            <input type="password" name="pswd" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required="" />
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
    </div>
    <div className="login">
        <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="txt" placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} required="" />
            <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required=""></input>
            <input type="password" name="pswd" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required="" />
            <button type="submit" onClick={handleSubmit}>Sign up</button>
        </form>
    </div>
</div>


);
} 
LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
}; 

export default LoginView;