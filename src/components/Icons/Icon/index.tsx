import React from 'react';
import { MouseEventHandler } from "react";
import { appendClassNames } from '../../../static/utils';

import './index.scss';

export type IconProps = {
    className? : string,
    onClick?   : MouseEventHandler<HTMLElement>,
    rotate?    : number,
}

const Icon: React.FC<IconProps> = ({ children, ...props }) => {

    const { onClick, rotate, className } = props ?? {};
    const style : React.CSSProperties = {};
    if (Number.isInteger(rotate)) {
        style.transform = `rotate(${rotate}deg)`;
    }

    const classToApply = appendClassNames(className, "icon");

    return <span onClick={onClick} className={classToApply} style={style}>
                {children}
            </span>;
}
  
export default Icon;



