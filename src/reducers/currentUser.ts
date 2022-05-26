import { UserActionTypes, LOG_OUT, SET_USER } from '../actions/userActions';
import { UserDataStore } from '../models/AuthUserData';

const initialState: UserDataStore = {
    loggedIn : false,
    user : null,
    token : ""
}

export default function currentUser (state: UserDataStore = initialState, action: UserActionTypes): UserDataStore {

    let result = state;

    switch(action.type){
        case SET_USER:
            result = action.payload;
            break;
        case LOG_OUT:
            result = initialState;
            break;

    }
    return result;
}