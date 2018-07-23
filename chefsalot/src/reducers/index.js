
import { ADD_TOKEN } from 'actions';
import { combineReducers } from 'redux';

function authReduce(state = '', action) {
    switch (action.type) {
        case ADD_TOKEN:
            return action.token;
        default:
            return state;
    }

}

var reducer = combineReducers({
        authReduce
    }
)

export default reducer;