import moment from 'moment';
import axios from 'axios';
var {hashHistory} = require('react-router');
import Helper from 'Helper';

import firebase, {dbRef} from 'app/firebase/';


//Auth
export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startOauthLogin = (provider) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(provider).then((result) => {
      //console.log('Auth worked', result);
    }, (error) => {
      //console.log('Unable to Oauth', error);
    });
  };
};

export var startRegister = (email, encryptedPassword, username) => {
  return (dispatch) => {
    return firebase.auth().createUserWithEmailAndPassword(email, encryptedPassword).then(
      ()=>{
        Helper.toast('You have registered succesfully!');
        //Save Username
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: username,
        }).then(function() {
          //console.log('saved displayName to DB');
        }, function(error) {
          //console.log('Error saving displayName to DB', error);
        });
      }, (error)=>{
      //console.log('Unable to Register', error);
      Helper.toast('Unable to Register - please try again!');
    });
  };
};

export var startLogin = (email, encryptedPassword) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, encryptedPassword).then(
      ()=>{
        Helper.toast('You have logged in succesfully!');
      }).catch((error)=>{
      //console.log('Unable to Login', error);
      Helper.toast('Could not log you in - please check your Email and Password!');
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      Helper.toast('Succesfully signed out!');
    });
  };
};




//Add Events
export var addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    event
  };
};

export var startAddEvent = (title, description, type, address, lat = '',lng = '', timeStart, timeEnd, host, guests) => {
  return (dispatch, getState) => {
    var event = {
      title, 
      description, 
      type, 
      address, 
      lat,
      lng, 
      timeStart, 
      timeEnd, 
      host, 
      guests
    };
    
    var eventSave = dbRef.child('events').push(event);
    return eventSave.then(() => {
      dispatch(addEvent(event));
      hashHistory.push('/');
      Helper.toast('Event has been created succesfully!');
    }).catch((error)=>{
      Helper.toast('Unable to save Event - please try again!');
    });
  };
};


export var getEvents = (events) => {
  return {
    type: 'GET_EVENTS',
    events
  };
};

export var startGetEvents = () => {
  return (dispatch, getState) => {

    var eventsRef = dbRef.child('events');

    return eventsRef.once('value').then((snapshot) => {
      var events = snapshot.val() || {};
      var parsedEvents = [];

      Object.keys(events).forEach((eventId) => {
        parsedEvents.push({
          id: eventId,
          ...events[eventId]
        });
      });

      dispatch(getEvents(parsedEvents));
    });
  };
};

export var toggleAdditionalFields = () => {
  return {
    type: 'TOGGLE_SHOW'
  };
};



//####################################################

//Get Restaurant List
export var getRestaurants = (restaurants) => {
  return {
    type: 'GET_RESTAURANTS',
    restaurants
  };
};

export var startGetRestaurants = () => {
  return (dispatch, getState) => {

    var restaurantsRef = dbRef.child('restaurants');

    return restaurantsRef.once('value').then((snapshot) => {
      var restaurants = snapshot.val() || {};
      var parsedRestaurants = [];

      Object.keys(restaurants).forEach((restaurantId) => {
        parsedRestaurants.push({
          id: restaurantId,
          ...restaurants[restaurantId]
        });
      });
      dispatch(getRestaurants(parsedRestaurants));
    });
  };
};

//Handle Ratings
export var getRatings = (ratings) => {
  return {
    type: 'GET_RATINGS',
    ratings
  };
};

export var startGetRatings = (restaurantId) => {
  return (dispatch) => {

    var ratingsRef = dbRef.child('ratings/');

    return ratingsRef.orderByChild('reference').equalTo(restaurantId).once('value').then((snapshot) => {
      var ratings = snapshot.val() || {};
      var parsedRatings = [];

      Object.keys(ratings).forEach((ratingId) => {
        parsedRatings.push({
          id: ratingId,
          ...ratings[ratingId]
        });
      });

      dispatch(getRatings(parsedRatings));
    });
  };
};

export var clearRatings = () => {
  return {
    type: 'CLEAR_RATINGS'
  };
};


//Add Review
export var addReview = (rating) => {
  return {
    type: 'ADD_RATING',
    rating
  };
};

export var startAddReview = (rating, name, comment, reference, date) => {
  return (dispatch, getState) => {
    var review = {
      rating, name, comment, reference, date
    };
    
    var reviewSave = dbRef.child('ratings').push(review);
    return reviewSave.then(() => {
      dispatch(addReview(review));
      Helper.toast('Review has been saved succesfully!');
    }).catch((error)=>{
      Helper.toast('Unable to save Review - please try again!');
    });
  };
};

//Store custom Data
export var setCheckedRadio = (checkedRadio) => {
  return {
    type: 'CHECKED_RADIO',
    checkedRadio
  };
};

export var storeLocation = (lat, lng) => {
  return {
    type: 'STORE_LOCATION',
    userLat: lat,
    userLng: lng
  };
};

export var showModal = (setTo) => {
  return {
    type: 'SHOW_MODAL',
    showModal: setTo
  }
}

//Filters
export var setFilters = (filters, sortBy) => {
  //filters = {id: bool, id2: bool2}
  //sortBy = "string"
  return {
    type: 'SET_FILTERS',
    filters,
    sortBy
  }
}
