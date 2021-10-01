
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import MenuButton from './Menu';
// import LogoutButton from './auth/LogoutButton';
import logo from "../lnl-logo.png"

const NavBar = () => {
  const user = useSelector(state => state.session.user) //use for toggle
  const history = useHistory();


  return (
    <div className="navbar__wrapper">
      <NavLink className="navbar__logo" to="/projects">
        <img alt="" className="navbar__logo" src={logo} />
      </NavLink>
      <MenuButton />
    </div>

  );
}

export default NavBar;
