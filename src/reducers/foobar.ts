import { SetFoobarActionTypes, SET_FOO_BAR } from '../actions/foobar';
import { FoobarStore } from '../models/Foobar';

const defFoobar : FoobarStore = {
    bar: 1,
    foo:"a"
}

export default function foobarStatus (state:FoobarStore = defFoobar, action: SetFoobarActionTypes):FoobarStore {

    switch(action.type){
        case SET_FOO_BAR:
            return action.payload;
        default:
            return state;
    }

}