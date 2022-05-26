import React, { useEffect, useState } from 'react';
import RenderIfTrue from '../RenderIfTrue';

interface TempoRenderingProps {
    time : number
}

const TempoRendering: React.FC<TempoRenderingProps> = ({ children, ...props }) => {
    const { time } = props;

    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer1 = setTimeout(() => setShow(false), time);
        return () => {
            clearTimeout(timer1);
        }
    }, [ show, time ]);

    return <RenderIfTrue condition = {show} >
                {children}
            </RenderIfTrue>
}
  
export default TempoRendering;