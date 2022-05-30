import React, { useEffect, useRef, useState } from 'react'
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export interface ProgressBarProps {
    time: number
}

export default function ProgressBar(props: ProgressBarProps) {

    const [ show, setShow ] = useState<boolean>(true);
    const pBar = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        pBar?.current?.addEventListener("animationend", () => setShow(false))
    }, [ pBar ])

    return (
        <RenderIfTrue condition={show}>
            <span ref={pBar} className='progress-bar'></span>
        </RenderIfTrue>
    )
}