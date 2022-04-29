import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';



// import './login-view.scss';
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');





// validate user inputs
const validate = () => {
  let isReq = true;
  if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
  } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
  }
  if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
  } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
  }
  if (!email) {
      setEmailErr('Please enter a email address');
      isReq = false;
  } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
  }
  return isReq;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
        if (isReq) {
            /* Send request to the server for authentication */
            axios.post('https://cinesam2022.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                birthday: birthday,
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login!');
                    window.open('/', '_self');
                })
                .catch(response => {
                    console.log(response);
                    alert('Unable to register');
                });
        }
    };




    return (
        <div>
          <form>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Birthday:
              <input
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </label>
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }



RegistrationView.propTypes = {
      register: PropTypes.shape({
          Username: PropTypes.string.isRequired,
          Password: PropTypes.string.isRequired,
          Email: PropTypes.string.isRequired
          
      }),
      
  };
export default RegistrationView;