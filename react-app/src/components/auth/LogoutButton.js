import React from 'react';
import { useDispatch } from 'react-redux';
import { projLogout } from '../../store/project';
import { logout } from '../../store/session';
import { taskLogout } from '../../store/task';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(taskLogout())
    dispatch(projLogout())
  };

  return <button className="menu__dropdown--button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
