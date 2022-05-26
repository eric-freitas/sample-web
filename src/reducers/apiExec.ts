import { ApiExecActionTypes, SET_STATUS } from '../actions/apiExec';
import { ApiExecDataStore, ApiExecStatus } from '../models/ApiExec';

export default function apiStatus (state:ApiExecDataStore[] = [], action: ApiExecActionTypes):ApiExecDataStore[] {

    let result = state;

    switch(action.type){
        case SET_STATUS:

            let curApis = state.filter(e => e.api !== action.payload.api);
            if (action.payload.status !== ApiExecStatus.Idle && action.payload.status !== ApiExecStatus.Ok) {
                curApis.push(action.payload);
            }

           result = curApis;
           break;
    }

    return result;
}