import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../context/Modal';
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [showModal, setShowModal] = useState(false)
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
      <h1>Simple Project Management</h1>
      <i className="fas fa-crow fa-5x"></i>
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
            <button className="login__buttons" onClick={demoLogin}>Demo</button>
            <button className="login__buttons" onClick={onLogin}>Login</button>
          </div>

          <p>
            Don't have an account?
            <button className="login-signup__modal-button" onClick={() => setShowModal(true)}>Sign Up</button>
                    {showModal && (
                        <Modal className="modal__signup" onClose={() => setShowModal(false)}>
                          <SignUpForm setShowModal={setShowModal}/>
                        </Modal>
                    )}
          </p>
      </div>
    </div>
  );
};

export default LoginForm;
