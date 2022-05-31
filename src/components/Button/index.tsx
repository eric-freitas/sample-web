import React               from 'react';
import { appendClassNames, SimpleCallback } from '../../static/utils';
import { FormFieldStatus } from '../FormField';

import './index.scss';

export interface SubmitAction {
    type?           : 'submit' | 'reset',
    form?           : string,
    url?            : string,
    encryptionType? : string,
    method?         : 'get' | 'post',
    validate?       : boolean,
    target?         : string,
    value?          : string
}

export interface ButtonProps {
    name?         : string,
    id?           : string,
    className?    : string,
    text?         : any,
    status?       : FormFieldStatus,
    onClick?      : SimpleCallback,
    submitAction? : SubmitAction,
    hint?         : string,
    borderless?   : boolean
}

export default function Button (props: ButtonProps){
    
    const { name, id, className, text, status, submitAction, hint, borderless, onClick } = props ?? {};
    const classToApply  = appendClassNames(
                            `button ${className ?? ""}`.trim(), 
                            (borderless ? "borderless" : "")
                        );
    
    const disabled      = (status === FormFieldStatus.Disabled) || undefined;

    let submitArgs: React.ButtonHTMLAttributes<HTMLButtonElement> = {
        type : "button"
    }
    if (submitAction) {
        const { type, form, url, encryptionType, method, validate, target, value } = submitAction;
        submitArgs = {
            form,
            formAction      : url,
            formEncType     : encryptionType,
            formMethod      : method || "post",
            formNoValidate  : !!validate,
            formTarget      : target,
            type,
            value
        }
    }

    return <button 
                name        = { name              }
                id          = { id                }
                className   = { classToApply      }
                disabled    = { disabled          }  
                onClick     = { onClick           }
                title       = { hint              }
                { ...submitArgs }
            >
                {text}
            </button>
};

  

