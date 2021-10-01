import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async(e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
  }

  if (user) {
    return <Redirect to='/projects' />;
  }

  return (
    <div className="login__wrapper">
      <p>Simple Project Management</p>
      <i class="fas fa-crow fa-5x"></i>
      <div className="login__container">

          <div className="login__errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
          </div>

          <div className="login__input--email">
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              />
          </div>

          <div className="login__input--password">
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              />
          </div>

          <div className="login__buttons--container">
            <button className="login__buttons" onClick={onLogin}>Login</button>
            <button className="login__buttons" onClick={demoLogin}>Demo</button>
          </div>

          <p>
            Don't have an account?
            <NavLink className="login__signup-link" to="/sign-up" exact={true}> Sign-Up</NavLink>
          </p>
      </div>
    </div>
  );
};

export default LoginForm;
