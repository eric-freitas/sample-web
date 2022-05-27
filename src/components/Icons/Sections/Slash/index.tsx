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
                <path fill="black" d="M 1e-4,7.9403 237.8173,245.7602 H 205.2339 L 1e-4,40.5237 Z"/>
            </mask>
        </g>
    );
}
