import React from 'react';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';
export interface SmallTextProps {
    className?  : string,
    children?   : any
}

export default function SmallText(props: SmallTextProps) {
    const { className, children } = props ?? {};

    return <RenderIfTrue condition={!!children} >
                <small className={className}>{children}</small>
           </RenderIfTrue>
};


