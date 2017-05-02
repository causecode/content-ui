import {store, addReducers} from 'react-hero';
import {reducers} from '../reducers';
let objectAssign: Function = require<Function>('object-assign');

if (store.replaceReducer) {
    store.replaceReducer(addReducers(objectAssign(reducers)));
}

export {store};
