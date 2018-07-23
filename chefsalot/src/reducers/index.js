import { ADD_TOKEN, REMOVE_TOKEN } from 'actions';
import { combineReducers } from 'redux';

function token(state = '', action) {
    switch (action.type) {
        case ADD_TOKEN:
        case REMOVE_TOKEN:
            return action.token
        default:
            return state;
    }

}

export default combineReducers({
    token
});