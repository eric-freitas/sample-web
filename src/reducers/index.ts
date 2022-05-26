import { combineReducers } from 'redux'

import currentUser from './currentUser'
import apiExec from './apiExec'

const rootReducer = combineReducers({
    currentUser,
    apiExec
})

export default rootReducer