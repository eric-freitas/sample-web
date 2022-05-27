import React from 'react';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export interface FormFieldLabelProps {
    className?    : string,
    headingIcon?  : JSX.Element,
    trailingIcon? : JSX.Element,
    children?     : any;
}

export default function FormFieldLabel(props: FormFieldLabelProps) {
    const { className, children, headingIcon, trailingIcon } = props ?? {};

    return (        
        <label className={className}>
            <RenderIfTrue condition={!!headingIcon}>
                {headingIcon}
            </RenderIfTrue>
            {children}
            <RenderIfTrue condition={!!trailingIcon}>
                {trailingIcon}
            </RenderIfTrue>
        </label>
    );
};


