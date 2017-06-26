const objectAssign = require<any>('object-assign');

export function blogReducer(state = {
    blogInstance: {},
    blogList: {},
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case 'FETCH_FETCHBLOGLIST_FULFILLED':
            return objectAssign({}, state, {blogList: action.payload, fetched: true});
        case 'FETCH_FETCHBLOGLIST_REJECTED':
            return objectAssign({}, state, {fetching: false, error: action.payload});
        case 'FETCH_FETCHBLOGINSTANCE_FULFILLED':
            return objectAssign({}, state, {fetched: true, blogInstance: action.payload});
        case 'FETCH_FETCHBLOGINSTANCE_REJECTED':
            return objectAssign({}, state, {fetching: false, error: action.payload});
        default:
            return state;
    }
};
