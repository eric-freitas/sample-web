import React from 'react';
import { wrapText, joinClassNames, SimpleCallback } from '../../static/utils';
import ConditionalRendering from '../ConditionalRendering';
import IconRequired from '../Icons/Required';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export enum FormFieldStatus {
    Enabled,
    Disabled
}

export interface BaseFormFieldProps {
    className?      : string,
    fieldClassName? : string,
    status?         : FormFieldStatus,
    label           : string,
    leadingIcon?    : JSX.Element,
    trailingIcon?   : JSX.Element,
    prefix?         : string,
    suffix?         : string,
    helperText?     : string,
    valid?          : boolean,
    invalid?        : boolean,
    required?       : boolean,
    invalidText?    : string
}

export interface FormFieldProps extends BaseFormFieldProps {
    children : JSX.Element,
    siblings? : any,
    onClick? : SimpleCallback
}

export default function FormField(props: FormFieldProps) {
    const { 
        label, 
        fieldClassName, 
        className, 
        status, 
        children, 
        leadingIcon,
        trailingIcon, 
        prefix,
        suffix,
        helperText,
        siblings,
        valid,
        invalid,
        invalidText,
        required,
        onClick 
    } = props ?? {};

    const fieldsetClassName = joinClassNames([ 
        className, 
        status === FormFieldStatus.Disabled ? "disabled" : null ,
        invalid ? "invalid" : (valid ? "valid" : null)
    ]);

    return (<>
                <fieldset className={fieldsetClassName} onClick={onClick}>
                    <label>
                        {label}
                        <RenderIfTrue condition={!!required}>
                            <IconRequired/>
                        </RenderIfTrue>
                    </label>
                        
                    <div className={joinClassNames(["form-field", fieldClassName])}>
                        <span className='form-field__content form-field__content_initial'>
                            {leadingIcon}
                            {wrapText(prefix, "small")}
                            {children}
                        </span>
                        <ConditionalRendering
                            condition = {!!(suffix && trailingIcon)}
                            ifTrue    = {<span className='form-field__content'>
                                            {wrapText(suffix, "small")}
                                            {trailingIcon}
                                        </span>}
                            ifFalse   = { suffix || trailingIcon || null}
                        />
                    </div>
                </fieldset>

                {siblings}
                
                {wrapText(helperText, "small", { className: "form-field__helper"})}
                <RenderIfTrue condition={!!(invalid && invalidText)}>
                    {wrapText(invalidText, "small", { className: "form-field__invalid-text"})}
                </RenderIfTrue>
            </> );
};


