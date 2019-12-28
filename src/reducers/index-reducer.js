import { combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  // register: gameReducer, // данные роуты можно намного проще указывать
  register: require('./gameReducer').default,
});

const store = createStore(reducers);

window.store = store; // зачем это было сделано!?
export default store;


// export default createStore(reducers)

// можно было просто назвать файл index и обращаться напрямую к папке оно бы по дефолту подтягивало index.js