import { ADD_TOKEN, REMOVE_TOKEN, ADD_MEASUREMENT_CHOICES } from 'actions';
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

function measurementChoices(state = [], action) {
    switch (action.type) {
        case ADD_MEASUREMENT_CHOICES:
            return action.measurementChoices
        default:
            return state
    }
}

export default combineReducers({
    token,
    measurementChoices
});