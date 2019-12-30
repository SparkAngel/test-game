import { combineReducers, createStore } from 'redux';
import gameReducer from './gameReducer';

const reducers = combineReducers({
  register: gameReducer,
});

export default createStore(reducers);
