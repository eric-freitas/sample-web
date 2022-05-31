
export interface ApiExecDataStore {
    error? : any,
    status : ApiExecStatus,
    api    : string
}

//TODO add functions to handle data store
export enum ApiExecStatus {
    Idle    = 0,
    Init    = 1,
    Loading = 2,
    Ok      = 3,
    Error   = 4
}

export interface DefaultMessages {
    missing       : any,
    check         : any,
    invalid       : any,
    alreadyExists : string
}