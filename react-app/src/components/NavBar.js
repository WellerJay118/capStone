
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MenuButton from './Menu';
// import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user) //use for toggle
  const history = useHistory();


  return (
    <div className="navbar__wrapper">
      <MenuButton />
    </div>

  );
}

export default NavBar;
