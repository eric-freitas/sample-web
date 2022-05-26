import { SpecialKey } from "./sniffKey";
import { SimpleCallback } from "./utils";

export interface CheatCoderArgs {
    sequence    : string[],
    specialKeys : SpecialKey[],
    onActivate  : SimpleCallback
}

export const cheatCoder = (args: CheatCoderArgs) => {

    const { sequence, specialKeys, onActivate } = args ?? {};

    if (specialKeys?.length && sequence.length) {
        const currentSequence: string[] = [];

        const downHandler = (e: KeyboardEvent) : void => {

            const { code, shiftKey, altKey, ctrlKey, metaKey } = e;

            if (code.match(/^Ctrl(Left|Right)?$/)) {
                if(!specialKeys.includes(SpecialKey.Control)) {
                    currentSequence.length = 0;
                }
            } else if (code.match(/^Shift(Left|Right)?$/)) {
                if(!specialKeys.includes(SpecialKey.Shift)) {
                    currentSequence.length = 0;
                }
            } else if (code.match(/^Alt(Left|Right)?$/)) {
                if(!specialKeys.includes(SpecialKey.Alt)) {
                    currentSequence.length = 0;
                }
            } else if (code.match(/^Cmd(Left|Right)?$/)) {
                if(!specialKeys.includes(SpecialKey.Cmd)) {
                    currentSequence.length = 0;
                }
            } else {
                if (
                    sequence.includes(code)
                    &&
                    ( specialKeys.includes(SpecialKey.Shift  ) === shiftKey  ) 
                    &&
                    ( specialKeys.includes(SpecialKey.Alt    ) === altKey    )    
                    &&
                    ( specialKeys.includes(SpecialKey.Control) === ctrlKey   )
                    &&
                    ( specialKeys.includes(SpecialKey.Cmd    ) === metaKey   )
                ) {
                    currentSequence.push(code);

                    if (currentSequence.length >= sequence.length && 
                        currentSequence.slice(-sequence.length).every((v, i) => v === sequence[i])) {
                        currentSequence.length = 0;
                        onActivate();
                    }
                } else {
                    currentSequence.length = 0;
                }
            }

        };

        const upHandler = (e: KeyboardEvent) : void => {
            if (e.code.match(/^(Ctrl(Left|Right)?)|(Shift(Left|Right)?)|(Alt(Left|Right)?)|(Cmd(Left|Right)?)$/)) {
                currentSequence.length = 0;
            } 
        };

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup",   upHandler  );
    }


}
