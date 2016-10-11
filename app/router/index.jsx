import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import Login from 'Login';
import AddEvent from 'AddEvent';
import EventList from 'EventList';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
    //console.log('redirect to login');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
    //console.log('already logged in, redirect to home');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={EventList}/>
      <Route path="login" component={Login} />
      <Route path="register" component={Login} />
      <Route path="add" component={AddEvent} />
    </Route>
  </Router>
);
