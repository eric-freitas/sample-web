import AppState from "./AppState";
import { FoobarStore } from "./Foobar";

interface RealAppState extends AppState {
    foobar: FoobarStore
}

export default RealAppState