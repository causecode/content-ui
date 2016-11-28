import { addThemeReducer } from './addThemeReducer';
import {addReducers} from 'react-hero';

export const reducer = addReducers({
    theme: addThemeReducer
});
