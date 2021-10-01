
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user) //use for toggle
  const history = useHistory();

  let topBar;
  if(user) {
    topBar = (
      <div className="navbar__buttons">
        <button onClick={(e) => history.push('/projects')}>My Projects</button>
        <button onClick={(e) => history.push(`/users/${user.id}`)}>Profile</button>
        <LogoutButton />
      </div>
    )
  } else {
    topBar = (
      <div className="navbar__buttons">
        <button onClick={(e) => history.push('/login')}>Login</button>
        <button onClick={(e) => history.push('/sign-up')}>Sign Up</button>
      </div>
    )
  }

  return (
    <div className="navbar__wrapper">
      {topBar}
    </div>
    // <nav>
    //   {/* <div> */}

    //     <div hidden={}>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </div>

    //     <div>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </div>

    //     <div>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </div>

    //     {/* <div>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </div> */}

    //     <div>
    //       <NavLink to='/projects' exact={true} activeClassName='active'>
    //         Projects
    //       </NavLink>
    //     </div>

    //     <div>
    //       <LogoutButton />
    //     </div>

    //   {/* </div> */}
    // </nav>
  );
}

export default NavBar;
