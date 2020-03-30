import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {SET_CURRENT_USER} from './actions/types';
import {logoutUser} from './actions/authActions';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';

import './App.css';

 
//Check for token
if(localStorage.jwtToken) {
    //set Auth token header
    setAuthToken(localStorage.jwtToken);
    //decode
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
  });

  //Check for expired token
  const currentTime = Date.now /1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    //redirect
    window.location.href = '/login';
  }
}

class  App extends Component{
  render(){
     return(
       <Provider store={store}>
        <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                </Switch>
                <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
              <Footer />
            </div>
        </Router> 
       </Provider>
     );
  }
}
export default App;