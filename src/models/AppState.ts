import { ApiExecDataStore } from "./ApiExec";
import { UserDataStore } from "./AuthUserData";

interface AppState {
    apiExec : ApiExecDataStore[],
    currentUser : UserDataStore
}

export default AppState