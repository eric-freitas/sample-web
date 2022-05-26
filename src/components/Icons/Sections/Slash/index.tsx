import React from 'react';

interface SlashIconProps {
    width   : number,
    height  : number
}

export default function SlashIcon(props: SlashIconProps) {

    const { width, height } = props;

    return (
        <g>
            <path 
                className   = "slash"  
                d           = "m 1.9274,10.0725 c -2.249,-2.249 -2.249,-5.8961 0,-8.1451 2.249,-2.249 5.8961,-2.249 8.1451,0 l 233.7602,233.7602 c 2.249,2.249 2.249,5.8961 0,8.1451 -2.249,2.249 -5.8961,2.249 -8.1451,0 z" 
            /> 
            <mask id="slash-mask">
                <rect x="0" y="0" width={width} height={height} fill="white" />
                <path fill="black" d="m 235.6876,243.8327 c 1.1857,1.1557 2.7128,1.7552 4.3719,1.6787 l -0.5593,0.2488 H 205.0349 L 1e-4,40.7255 V 6.2412 L 0.355,4.8565 c -0.3685,1.8275 0.1557,3.7992 1.5724,5.216 77.9154,77.9153 155.8398,155.8397 233.7602,233.7602 z"/>
            </mask>
        </g>
    );
}
