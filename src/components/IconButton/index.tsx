import React               from 'react';
import Button, { ButtonProps } from '../Button';

import './index.scss';

export interface IconButtonProps extends ButtonProps {
    icon : JSX.Element
}

export default function IconButton(props:IconButtonProps) {

    const { icon, text, ...otherProps } = props;

    const innerContent = (text && <span>{text}</span>)

    const content = (
        <>
            {icon}
            {innerContent}
        </>
    )

    return <Button  {...otherProps} text={content} />
}
