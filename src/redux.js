import { applyMiddleware, combineReducers, createStore,} from 'redux';
import {reducer as notifications} from 'react-notification-system-redux';
import logger from 'redux-logger'

import {questions, counter} from './reducer/reducer.js'

export function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      questions,
      counter,
      notifications
    }),
    applyMiddleware(logger)
  );
}


export const store = configureStore();
