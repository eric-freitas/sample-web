export enum SpecialKey {
    Shift,
    Alt,
    Control,
    Cmd 
}

export type KeyPressCallback = ( keyCode : string) => void;

export interface SniffKeyArgs {
    keyCode      : string,
    specialKeys? : SpecialKey[],
    onPress      : KeyPressCallback
}

export interface SniffKeyData {
    [keyCode : string] : SniffKeyArgs
}

export type SniffKeyFunction = {
    addKey    : (args    : SniffKeyArgs) => void,
    removeKey : (keyCode : string      ) => void
}

export type SniffKeyClosure = () => SniffKeyFunction;

const sniffKeyClosure: SniffKeyClosure = () => {

    let keysSniffed: SniffKeyData = {};

    const addKey = (args: SniffKeyArgs) : void => {
        const { keyCode }    = args;
        keysSniffed[keyCode] = args;
    }

    const removeKey = (keyCode : string): void => {
        delete keysSniffed[keyCode];
    }
   
    const downHandler = (e: KeyboardEvent) : void => {
        const { code, shiftKey, altKey, ctrlKey, metaKey } = e;
        const data = keysSniffed[code];
        if (data) {
            let { specialKeys } = data;
            specialKeys = specialKeys || [];
            if (
                ( specialKeys.includes(SpecialKey.Shift  ) === shiftKey  ) 
                &&
                ( specialKeys.includes(SpecialKey.Alt    ) === altKey    )    
                &&
                ( specialKeys.includes(SpecialKey.Control) === ctrlKey   )
                &&
                ( specialKeys.includes(SpecialKey.Cmd    ) === metaKey   )
            ) {
                data.onPress(code);
            }
        }
    }

    window.addEventListener("keydown", downHandler);

    return {
        addKey,
        removeKey
    };
}

let sniffKeyFunction : SniffKeyFunction;

export const sniffKey : SniffKeyClosure = () => {
    sniffKeyFunction = sniffKeyFunction || sniffKeyClosure();
    return sniffKeyFunction;
}

