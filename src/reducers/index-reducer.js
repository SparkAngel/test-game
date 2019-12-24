import { combineReducers, createStore } from 'redux';
import gameReducer from './gameReducer';

const reducers = combineReducers({
  register: gameReducer,
});

const store = createStore(reducers);

window.store = store;
export default store;
