
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import MenuButton from './Menu';
// import LogoutButton from './auth/LogoutButton';
import logo from "../lnl-logo.png"

const NavBar = () => {
  const user = useSelector(state => state.session.user) //use for toggle
  const history = useHistory();

  const linkedIn = "https://www.linkedin.com/in/jacob-weller-592795161/"
  const github = "https://github.com/WellerJay118"


  return (
    <div className="navbar__wrapper">
      <div className="navbar__aboutme">
        <button className="navbar__github">
            <a target="_blank" rel="noreferrer" href={github} className="navbar__github">
                <i className="fab fa-github fa-2x"></i>
            </a>
        </button>
        <button className="navbar__linkedin">
            <a target="_blank" rel="noreferrer" href={linkedIn} className="navbar__linkedin">
                <i className="fab fa-linkedin fa-2x"></i>
            </a>
        </button>
      </div>
      <NavLink className="navbar__logo" to="/projects">
        <img alt="" className="navbar__logo" src={logo} />
      </NavLink>
      <MenuButton />
    </div>

  );
}

export default NavBar;
