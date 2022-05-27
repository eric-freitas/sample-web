import React from 'react';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export interface FormFieldLabelProps {
    className?    : string,
    text          : string,
    headingIcon?  : JSX.Element,
    trailingIcon? : JSX.Element
}

/* TODO test */

export default function FormFieldLabel(props: FormFieldLabelProps) {
    const { className, text, headingIcon, trailingIcon } = props ?? {};

    return (        
        <label className={className}>
            <RenderIfTrue condition={!!headingIcon}>
                {headingIcon}
            </RenderIfTrue>
            {text}
            <RenderIfTrue condition={!!trailingIcon}>
                {trailingIcon}
            </RenderIfTrue>
        </label>
    );
};


