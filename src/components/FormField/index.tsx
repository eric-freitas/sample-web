import React from 'react';
import { SimpleCallback, appendClassNames } from '../../static/utils';
import FormFieldLabel from '../FormFieldLabel';
import IconRequired from '../Icons/Required';
import RenderIfTrue from '../RenderIfTrue';
import SmallText from '../SmallText';

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

    const fieldsetClassName = appendClassNames( 
        className, 
        status === FormFieldStatus.Disabled ? "disabled" : null ,
        invalid ? "invalid" : (valid ? "valid" : null)
    );

    return (<>
                <fieldset className={fieldsetClassName} onClick={onClick}>
                    <FormFieldLabel
                        text         = { label }
                        trailingIcon = { <RenderIfTrue condition={!!required}><IconRequired/></RenderIfTrue> }
                    />
                        
                    <div className={appendClassNames(fieldClassName, "form-field")}>
                        <span className='form-field__content form-field__content_initial'>
                            {leadingIcon}
                            <SmallText>{prefix}</SmallText>
                            {children}
                        </span>
                        <RenderIfTrue condition={!!(suffix || trailingIcon)}>
                            <span className='form-field__content'>
                                <SmallText>{suffix}</SmallText>
                                {trailingIcon}
                            </span>
                        </RenderIfTrue>
                    </div>
                </fieldset>

                {siblings}
                
                <SmallText className="form-field__helper">{helperText}</SmallText>
                <RenderIfTrue condition={!!(invalid && invalidText)}>
                    <SmallText className="form-field__invalid-text">{invalidText}</SmallText>
                </RenderIfTrue>
            </> );
};


