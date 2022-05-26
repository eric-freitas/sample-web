import React from 'react';
import { MouseEventHandler } from "react";

import './index.scss';

export type IconProps = {
    className? : string,
    onClick?   : MouseEventHandler<HTMLElement>
}

const Icon: React.FC<IconProps> = ({ children, ...props }) => {

    const { onClick, className } = props || {};

    return <span onClick={onClick} className={`icon ${className || ""}`}>
                {children}
            </span>;
}
  
export default Icon;



