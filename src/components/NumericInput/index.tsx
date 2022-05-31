import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { appendClassNames } from '../../static/utils';
import FormField, { BaseFormFieldProps, FormFieldStatus } from '../FormField';

import './index.scss';

export interface NumericInputProps extends BaseFormFieldProps {
    id?    : string,
    value? : number,
    min?   : number,
    max?   : number,

    onChange?: (newValue: number | null) => void;
}

//TODO automatic test

const NumericInput: React.FC<NumericInputProps> = ( props ) =>  {
    const { id, status, invalid, value, required, fieldClassName, min, max } = props ?? {};
    const disabled = status === FormFieldStatus.Disabled;

    const [ curValue , setCurValue  ] = useState<number|null>(value ?? null);
    const [ changed  , setChanged   ] = useState<boolean>(false);
    const [ isInvalid, setIsInvalid ] = useState<boolean>(!!invalid);

    const inputElement = useRef<HTMLInputElement>(null);

    const onClick = () => {
        inputElement?.current?.focus();
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        let { value } = e?.target ?? {};
        let numberVal: number|null = parseFloat(value);
        if (Number.isNaN(numberVal)) {
            numberVal = null;
        }
        setCurValue(numberVal);
        props?.onChange?.call(this, numberVal);
    }

    useEffect(() => {
        setIsInvalid(invalid || !!(required && changed && !curValue));
    }, [ changed, curValue, required, invalid ])

    let inputProps:any = {};
    if (min) {
        inputProps.min = min;
    }
    if (max) {
        inputProps.max = max;
    }

    return (
        <FormField 
            {...props}
            invalid        = { isInvalid }
            onClick        = { onClick   }
            fieldClassName = { appendClassNames(fieldClassName, "input") }
        >
            <input {...inputProps} type="number" inputMode="decimal" ref={inputElement} id={id} disabled={disabled} value={curValue ?? ""} onChange={onChange}/>
        </FormField>
    );
};
  
export default NumericInput;