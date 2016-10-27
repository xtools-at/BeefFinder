import moment from 'moment';

export var filtersReducer = (state = {
  filters: {
    switch_steak: true,
    switch_burgers: true,
    switch_grill: true,
    switch_price1: true,
    switch_price2: true,
    switch_price3: true
  },
  sortBy: 'BEST'
}, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
        sortBy: action.sortBy
      };
    default:
      return state;
  }
};

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


export var storageReducer = (state = {
  userLat: '',
  userLng: '',
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
