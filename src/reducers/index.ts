import { combineReducers } from 'redux'

import currentUser from './currentUser'
import apiExec from './apiExec'
import foobar from './foobar';

const appReducer = combineReducers({
    currentUser,
    apiExec,
    foobar
})

export default appReducer