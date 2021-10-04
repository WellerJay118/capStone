import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(password !== repeatPassword) {
      setErrors(['Passwords need to match'])
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName,));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup__wrapper">

      <div className="signupPage__container">

        <div className="signupPage__errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <form onSubmit={onSignUp}>
          {/* <div className="signupPage__form--username-input"> */}
            {/* <label>Username</label> */}
            <input
            className="signupPage__form--input"
              placeholder="Username"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            />
          {/* </div> */}
            {/* <label>Email</label> */}
            <input
              className="signupPage__form--input"
              placeholder="Email address"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
          {/* <div className="signupPage__form--firstname-input"> */}
            {/* <label>First Name</label> */}
            <input
              className="signupPage__form--input"
              placeholder="First Name"
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
            />
          {/* </div> */}
            {/* <label>Last Name</label> */}
            <input
              className="signupPage__form--input"
              placeholder="Last Name"
              type='text'
              name='lastName'
              onChange={updateLastName}
              value={lastName}
            />
            {/* <label>Password</label> */}
            <input
              className="signupPage__form--input"
              placeholder="Password"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
            {/* <label>Confirm Password</label> */}
            <input
              className="signupPage__form--input"
              placeholder="Confirm Password"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            />
          <button className="signupPage__form--button"type='submit'>Sign Up</button>
        </form>

      </div>

    </div>
  );
};

export default SignUpForm;
