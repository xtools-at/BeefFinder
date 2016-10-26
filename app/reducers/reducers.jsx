import moment from 'moment';

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export var eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state,
        action.event
      ];
    case 'GET_EVENTS':
      return [
        ...state,
        ...action.events
      ];
    case 'LOGOUT':
      return [...state];
    default:
      return state;
  }
};

export var storageReducer = (state = {
  userLat: '',
  userLng: '',
  activeEvent: '',
  toggleMap: false,
  showModal: false,
  checkedRadio: 0
  }, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {
        ...state,
        userLat : action.userLat,
        userLng : action.userLng
      };
    case 'SET_ACTIVE_EVENT':
      return {
        ...state,
        activeEvent: action.activeEvent
      };
    case 'SET_MAP_CENTER':
      return {
        ...state,
        mapCenter: action.mapCenter
      };
    case 'TOGGLE_MAP':
      var toggle = !(state.toggleMap);
      return {
        ...state,
        toggleMap: toggle
      };
    case 'SET_TOGGLE_MAP':
      return {
        ...state,
        toggleMap: action.toggleMap
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: action.showModal
      };
    case 'CHECKED_RADIO':
      return {
        ...state,
        checkedRadio: action.checkedRadio
      };
    case 'LOGOUT':
      return {
        ...state
      };
    default:
      return state;
  }
};

export var additionalFieldsReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW':
      return !state;
    default:
      return state;
  }
};


//################################################

export var restaurantsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RESTAURANT':
      return [
        ...state,
        action.restaurant
      ];
    case 'GET_RESTAURANTS':
      return [
        ...state,
        ...action.restaurants
      ];
    default:
      return state;
  }
};

export var ratingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RATING':
      return [
        ...state,
        action.rating
      ];
    case 'GET_RATINGS':
      return [
        ...action.ratings
      ];
    case 'CLEAR_RATINGS':
      return [];
    default:
      return state;
  }
};