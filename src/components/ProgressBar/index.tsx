import React, { useEffect, useRef, useState } from 'react'
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export interface ProgressBarProps {
    time: number
}

//TODO TEST

export default function ProgressBar(props: ProgressBarProps) {

    const { time } = props ?? {};

    const [ show, setShow ] = useState<boolean>(true);
    const pBar = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        pBar?.current?.addEventListener("animationend", () => setShow(false))
    }, [ pBar ])

    return (
        <RenderIfTrue condition={show}>
            <span role="progressbar" ref={pBar} className='progress-bar' style={{animationDuration : `${time || 10}s`}}></span>
        </RenderIfTrue>
    )
}