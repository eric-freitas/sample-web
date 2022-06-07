import { ApiExecDataStore } from "../models/ApiExec";

//export const SET_API_ERROR  = "SET_API_ERROR";
export const SET_API_STATUS = "SET_API_STATUS";
/*
interface SetApiErrorAction {
    type    : typeof SET_API_ERROR
    payload : any
}
*/
interface SetApiStatusAction {
    type    : typeof SET_API_STATUS
    payload : ApiExecDataStore
}

export type SetApiStatus = (data:ApiExecDataStore) => SetApiStatusAction;
export interface ApiStatusAction {
    setApiStatus: SetApiStatus
}

const result: ApiStatusAction = {
    setApiStatus : (data:ApiExecDataStore) => {
        return {
            type    : SET_API_STATUS,
            payload : data
        }
    }
}

export default result;

export type ApiExecActionTypes = /*SetApiErrorAction |*/ SetApiStatusAction