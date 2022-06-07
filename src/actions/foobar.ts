import { FoobarStore } from "../models/Foobar";

export const SET_FOO_BAR = "SET_FOO_BAR";

interface SetFoobarAction {
    type    : typeof SET_FOO_BAR
    payload : FoobarStore
}

export type SetFoobar = (data:FoobarStore) => SetFoobarAction;
export interface FoobarAction {
    setFoobar: SetFoobar
}

const result: FoobarAction = {
    setFoobar : (data:FoobarStore) => {
        return {
            type    : SET_FOO_BAR,
            payload : data
        }
    }
}

export default result;

export type SetFoobarActionTypes = SetFoobarAction