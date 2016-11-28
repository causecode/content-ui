import {store} from 'react-hero';
import {reducer} from '../reducers/index';

if (store.replaceReducer) {
    store.replaceReducer(reducer);
}

export {store};
