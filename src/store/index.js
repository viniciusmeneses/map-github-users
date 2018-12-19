import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './ducks';

import sagas from './sagas';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = createStore(reducers, {}, compose(applyMiddleware(...[])));

sagaMiddleware.run(sagas);

export default store;
