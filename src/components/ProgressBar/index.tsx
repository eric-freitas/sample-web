import React, { useState } from 'react'
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export interface ProgressBarProps {
    time: number
}

export default function ProgressBar(props: ProgressBarProps) {

    const { time } = props ?? {};
    const [ show, setShow ] = useState<boolean>(true);

    return (
        <RenderIfTrue condition={show}>
            <span onAnimationEnd={() => setShow(false)} role="progressbar" className='progress-bar' style={{animationDuration : `${time || 10}s`}}></span>
        </RenderIfTrue>
    )
}