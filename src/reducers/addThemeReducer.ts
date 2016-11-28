import {ADD_THEME} from '../actions/addThemeActions';
import {fromJS} from 'immutable';

const INITIALSTATE = fromJS({});

export function addThemeReducer(state = INITIALSTATE, action) {
    switch (action.type) {

        case ADD_THEME:
            return action.payload;

        default:
            return state;
    }
}
