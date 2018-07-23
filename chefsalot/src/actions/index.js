
// auth action types
export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function addToken(token) {
    return {
        type: ADD_TOKEN,
        token
    }
}

export function removeToken() { 
    return {
        type: REMOVE_TOKEN,
        token: ''
    }
}