import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ProjectsPage from './components/Projects';
import CreateProject from './components/CreateProject';
import IndivProject from './components/IndivProject';
import EditProject from './components/EditProject';
import EditTask from './components/EditTask';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/projects' exact={true} >
          <ProjectsPage />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/create' exact={true} >
          <CreateProject />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/:id/edit' exact={true} >
          <EditProject />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/:id/tasks/:taskId' exact={true} >
          <EditTask />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/:id' exact={true} >
          <IndivProject />
        </ProtectedRoute>


        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>

        <Route path='/'>
          <h1>404 Page Not Found</h1>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
