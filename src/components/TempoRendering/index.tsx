import React, { useEffect, useState } from 'react';
import { SimpleCallback } from '../../static/utils';
import RenderIfTrue from '../RenderIfTrue';

interface TempoRenderingProps {
    time      : number,
    onFinish? : SimpleCallback
}

const TempoRendering: React.FC<TempoRenderingProps> = ({ children, ...props }) => {
    const { time, onFinish } = props;

    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShow(false);
            onFinish?.call(null);
        }, time);
        return () => {
            clearTimeout(timer1);
        }
    }, [ show, time, onFinish ]);

    return <RenderIfTrue condition = {show} >
                {children}
            </RenderIfTrue>
}
  
export default TempoRendering;