import * as redux from 'redux';
import thunk from 'redux-thunk';

import { restaurantsReducer, ratingsReducer, storageReducer, filtersReducer } from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    storage: storageReducer,
    restaurants:  restaurantsReducer,
    ratings: ratingsReducer,
    filter: filtersReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
