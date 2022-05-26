import React from 'react';
import ConditionalRendering from '../ConditionalRendering';

interface RenderIfTrueProps {
    condition   : boolean
}

const RenderIfTrue: React.FC<RenderIfTrueProps> = ({ children, ...props }) => {
    const { condition } = props;

    return (<ConditionalRendering condition={condition} ifTrue={children} />);
}
  
export default RenderIfTrue;