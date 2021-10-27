import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import ProjectsPage from './components/Projects';
import IndivProject from './components/IndivProject';
import EditTask from './components/EditTask';
import BadRoute from './components/BadRoute';
import SplashPage from './components/Splash';

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

        <ProtectedRoute path='/projects' exact={true} >
          <ProjectsPage />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/:id/tasks/:taskId' exact={true} >
          <EditTask />
        </ProtectedRoute>

        <ProtectedRoute path='/projects/:id' exact={true} >
          <IndivProject />
        </ProtectedRoute>


        <Route path='/' exact={true} >
          <SplashPage />
        </Route>

        <Route path='/'>
          <BadRoute />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
