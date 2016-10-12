var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

import Main from 'Main';
import router from 'app/router/';
var actions = require('actions');
var store = require('configureStore').configure();

import firebase from 'app/firebase/';

firebase.auth().onAuthStateChanged((user) => {
  hashHistory.push('/');
  if (user) {
    store.dispatch(actions.login(user.uid));
    //console.log('onAuthStateChanged, dispatched user.uid', user);
  } else {
    store.dispatch(actions.logout());
    //console.log('onAuthStateChanged','no user, fired logout');
  }
});

//fetch Restaurants
store.dispatch(actions.startGetRestaurants());


// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
