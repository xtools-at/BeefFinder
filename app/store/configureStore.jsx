import * as redux from 'redux';
import thunk from 'redux-thunk';

import { restaurantsReducer, additionalFieldsReducer, authReducer, storageReducer } from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    additionalFields: additionalFieldsReducer,
    auth: authReducer,
    storage: storageReducer,
    restaurants:  restaurantsReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
