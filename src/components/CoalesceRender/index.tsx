import React from 'react';
import ConditionalRendering from '../ConditionalRendering';

export interface CoalesceRenderProps {
    toRender?  : JSX.Element,
    defaultVal : JSX.Element
}

export default function CoalesceRender(props: CoalesceRenderProps) {
    const { toRender, defaultVal } = props;
    return (
        <ConditionalRendering condition={!!toRender} ifTrue={toRender} ifFalse={defaultVal} />
    )
}