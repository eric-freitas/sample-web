import { ApiStatusAction } from "../actions/apiExec"

export default interface AppProps {
    loadingPage? : JSX.Element,
    routes       : JSX.Element,
    actions?     : {
        apiExec? : ApiStatusAction
    }
}