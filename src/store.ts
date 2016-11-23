import { applyMiddleware, createStore, compose } from 'redux';

import * as axios from 'axios';
import reducer from './reducers/reducers.ts';
import {store} from 'react-hero';


if (store.replaceReducer) {
    store.replaceReducer(reducer);
}

export default store;
