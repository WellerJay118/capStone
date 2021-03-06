import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuButton from './Menu';
import logo from "../components/images/lnl-logo.png"

const NavBar = () => {

  const linkedIn = "https://www.linkedin.com/in/jacob-weller-592795161/"
  const github = "https://github.com/WellerJay118/capStone"

  return (
    <div className="navbar__container">

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

        <NavLink className="navbar__logo" to="/">
          <img alt="" className="navbar__logo" src={logo} />
        </NavLink>

          <MenuButton />
      </div>
   </div>

  );
}

export default NavBar;
