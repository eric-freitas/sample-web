import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { appendClassNames } from '../../static/utils';
import FormField, { BaseFormFieldProps, FormFieldStatus } from '../FormField';

import './index.scss';

export interface TextInputProps extends BaseFormFieldProps {
    id?   : string,
    text? : string,

    onChange?: (newText: string) => void;
}

const TextInput: React.FC<TextInputProps> = ( props ) =>  {
    const { id, status, invalid, text, required, fieldClassName } = props ?? {};
    const disabled = status === FormFieldStatus.Disabled;

    const [ curValue , setCurValue  ] = useState<string>(text ?? "");
    const [ changed  , setChanged   ] = useState<boolean>(false);
    const [ isInvalid, setIsInvalid ] = useState<boolean>(!!invalid);

    const inputElement = useRef<HTMLInputElement>(null);

    const onClick = () => {
        inputElement?.current?.focus();
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        let { value } = e?.target ?? {};
        value = value ?? "";
        setCurValue(value);
        props?.onChange?.call(this, value);
    }

    useEffect(() => {
        setIsInvalid(invalid || !!(required && changed && !curValue));
    }, [ changed, curValue, required, invalid ])


    return (
        <FormField 
            {...props}
            invalid        = { isInvalid }
            onClick        = { onClick   }
            fieldClassName = { appendClassNames(fieldClassName, "input") }
        >
            <input ref={inputElement} id={id} disabled={disabled} value={curValue} onChange={onChange}/>
        </FormField>
    );
};
  
export default TextInput;


