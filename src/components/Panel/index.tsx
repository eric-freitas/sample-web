import React, { useEffect, useState }               from 'react';
import { cheatCoder } from '../../static/cheatCoder';
import { joinClassNames, SimpleCallback } from '../../static/utils';
import { CheatCodeRevealingProps } from '../CheatCodeRevealing';
import IconButton from '../IconButton';
import IconClose from '../Icons/Close';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export enum PanelType {
    Standard,
    Box
}

interface PanelProps {
    icon?       : JSX.Element
    title       : string
    closable?   : boolean
    onClose?    : SimpleCallback,
    cheatCoded? : CheatCodeRevealingProps,
    className?  : string,
    type?       : PanelType
}

const Panel: React.FC<PanelProps> = ({ children, ...props }) =>  {
    const { title, icon, closable, className, cheatCoded, onClose, type } = props;
    const panelType = type === PanelType.Box ? "box" : null;

    const [ show, setShow ] = useState<boolean>(true);

    const onClick = () => {
        setShow(false);
        onClose?.call(this);
    }

    useEffect(() => {
        if (cheatCoded) {
            setShow(false);

            const { sequence, specialKeys } = cheatCoded;
            cheatCoder({
                sequence,
                specialKeys,
                onActivate: () => setShow(true)
            })
        }
    }, [ cheatCoded ]);

    return (
        <RenderIfTrue condition={show}>
            <article className={joinClassNames(["panel", className, panelType])}>
                
                <header>
                    <span className='panel__title'>
                        {icon}
                        <h2>{title}</h2>
                    </span>
                    <RenderIfTrue condition={!!closable}>
                        <IconButton icon={<IconClose/>} onClick={onClick} className='borderless'/>
                    </RenderIfTrue>
                </header>
                
                <section>
                    <div className="panel__content">
                        {children}
                    </div>
                </section>
            </article>
        </RenderIfTrue>
    )

};

  
export default Panel;

