import React, { useEffect, useState }               from 'react';
import { cheatCoder } from '../../static/cheatCoder';
import { appendClassNames, defaultsToTrue, SimpleCallback } from '../../static/utils';
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
    type?       : PanelType,
    visible?    : boolean
}

const Panel: React.FC<PanelProps> = ({ children, ...props }) =>  {
    const { title, icon, closable, className, cheatCoded, onClose, type, visible } = props;
    const _visible = defaultsToTrue(visible);
    const [ show, setShow ] = useState<boolean>(_visible);

    const onClick = () => {
        setShow(false);
        onClose?.call(this);
    }

    useEffect(() => {
        if (cheatCoded && !visible) {
            setShow(false);

            const { sequence, specialKeys } = cheatCoded;
            cheatCoder({
                sequence,
                specialKeys,
                onActivate: () => setShow(true)
            })
        }
    }, [ cheatCoded, visible ]);

    return (
        <RenderIfTrue condition={show}>
            <article className={appendClassNames(className, "panel", type === PanelType.Box ? "box" : null)}>
                
                <header>
                    <span className='panel__title'>
                        {icon}
                        <h2>{title}</h2>
                    </span>
                    <RenderIfTrue condition={!!closable}>
                        <IconButton icon={<IconClose/>} onClick={onClick} borderless/>
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

