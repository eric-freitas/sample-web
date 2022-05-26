import { UserDataStore } from '../models/AuthUserData';

export const SET_USER = "SET_USER";
export const LOG_OUT  = "LOG_OUT";

interface SetUserAction {
    type    : typeof SET_USER
    payload : UserDataStore
}

interface LogoutAction {
    type    : typeof LOG_OUT
}

const setUser = (userObj: UserDataStore):SetUserAction => {
    return {
        type: SET_USER,
        payload: userObj
    }
}

const logOut = ():LogoutAction => {
    return {
        type: LOG_OUT
    }
}

 // eslint-disable-next-line
export default {
    setUser,
    logOut
}

export type UserActionTypes = SetUserAction | LogoutAction