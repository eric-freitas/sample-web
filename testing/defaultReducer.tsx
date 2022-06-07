import { combineReducers } from 'redux'

import currentUser from '../src/reducers/currentUser'
import apiExec from '../src/reducers/apiExec'

const defaultReducer = combineReducers({
    currentUser,
    apiExec
})

export default defaultReducer