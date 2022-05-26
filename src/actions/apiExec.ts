import { ApiExecDataStore } from "../models/ApiExec";

export const SET_ERROR  = "SET_ERROR";
export const SET_STATUS = "SET_STATUS";

interface SetErrorAction {
    type    : typeof SET_ERROR
    payload : any
}

interface SetStatusAction {
    type    : typeof SET_STATUS
    payload : ApiExecDataStore
}

const setStatus = (data:ApiExecDataStore):SetStatusAction => {
    return {
        type    : SET_STATUS,
        payload : data
    }
}
 
// eslint-disable-next-line
export default {
    setStatus
}

export type ApiExecActionTypes = SetErrorAction | SetStatusAction