import React, { useEffect, useState } from 'react';
import { cheatCoder } from '../../static/cheatCoder';
import { SpecialKey } from '../../static/sniffKey';
import RenderIfTrue from '../RenderIfTrue';

export interface CheatCodeRevealingProps {
    sequence    : string[],
    specialKeys : SpecialKey[]
}

const CheatCodeRevealing: React.FC<CheatCodeRevealingProps> =  ({ children, ...props }) => {
    const { sequence, specialKeys } = props;

    const [ show, setShow ] = useState<boolean> (false);

    useEffect(() => {
        cheatCoder({
            sequence,
            specialKeys,
            onActivate: () => setShow(true)
        })
    }, [
        sequence,
        specialKeys
    ]);

    return <RenderIfTrue condition={show}>
                {children}
            </RenderIfTrue>
}
  
export default CheatCodeRevealing;