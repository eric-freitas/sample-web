import { ApiExecDataStore } from "../models/ApiExec";

export const SET_API_ERROR  = "SET_API_ERROR";
export const SET_API_STATUS = "SET_API_STATUS";

interface SetApiErrorAction {
    type    : typeof SET_API_ERROR
    payload : any
}

interface SetApiStatusAction {
    type    : typeof SET_API_STATUS
    payload : ApiExecDataStore
}

const setApiStatus = (data:ApiExecDataStore):SetApiStatusAction => {
    return {
        type    : SET_API_STATUS,
        payload : data
    }
}
 
// eslint-disable-next-line
export default {
    setApiStatus
}

export type ApiExecActionTypes = SetApiErrorAction | SetApiStatusAction