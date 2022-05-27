import React, { Children, ReactNode, useEffect, useState } from 'react';
import { appendClassNames } from '../../static/utils';
import FormField, { BaseFormFieldProps, FormFieldStatus } from '../FormField';
import IconChevron from '../Icons/Chevron';

import './index.scss';

export type DropDownItem = string | number | ReactNode;

export interface DropdownProps extends BaseFormFieldProps {
    id     : string,
    value? : DropDownItem | null
    
    onSelected? : (item: DropDownItem) => void,

    children?   : DropDownItem | DropDownItem[] 
}

const Dropdown: React.FC<DropdownProps> = ( props ) =>  {
    const { 
        children, 
        fieldClassName,
        id, 
        className, 
        status, 
        onSelected, 
        value, 
        trailingIcon,
        required,
        invalid
    } = props ?? {};

    let selectedVal = value;
    const _children = (!!children && Array.isArray(children) ? children : [ children ]) || [];
    // eslint-disable-next-line eqeqeq
    if (_children && typeof(selectedVal) !== 'object' && !_children.find(e => e == selectedVal)) {
        const findChild = (child: DropDownItem, val: any) => {
            const e = (child as any);
            // eslint-disable-next-line eqeqeq
            return (e.val ?? e.value ?? e.id ?? e.key ?? e) == val;
        }
        selectedVal = _children.find(e => findChild(e, selectedVal));
    }

    const [ selected  , setSelected   ] = useState<DropDownItem | null>(selectedVal ?? null);
    const [ show      , setShow       ] = useState<boolean>(false);
    const [ isInvalid , setIsInvalid  ] = useState<boolean>(!!invalid);
    const [ hasChanged, setHasChanged ] = useState<boolean>(false);
    
    const disabled = (status === FormFieldStatus.Disabled) || undefined;

    useEffect(() => {
        setIsInvalid(invalid || !!(required && hasChanged && !show && !selected));
    }, [ required, selected, hasChanged, show, invalid ]);

    const onClick = () => {
        if (disabled) {
            setShow(false);
        } else {
            setHasChanged(true);
            setShow(!show);
        }
    }

    const onSelect = (child: ReactNode) => {
        if (!disabled) {
            setSelected(child);
            setShow(false);
            onSelected?.call(this, child);
        }
    }

    const renderChild = (child: DropDownItem, index: number) => {
        return (
            <li key={index} onClick={() => onSelect(child)}>
                { typeof(child) !== "object" ? <span className='dropdown__simple-item'>{child}</span> : child}
            </li>
        );
    }

    const dropdownOptions = show ? <ul key="options" className='options'>{Children.map(children, renderChild)}</ul> : null;

    return (
        <div className='dropdown'>
            <FormField 
                {...props}
                
                fieldClassName = { appendClassNames(fieldClassName, "select") }
                onClick        = { onClick   } 
                status         = { status    }
                invalid        = { isInvalid }
                className      = { appendClassNames(className, show ? "selected" : null) }
                trailingIcon   = { trailingIcon ?? <IconChevron className={show ? "flip-vertical": ""} />}
                siblings       = { dropdownOptions }
            >
                <span id={id} className='input-area input'>
                    {selected}
                </span>
            </FormField>
        </div>
    );
};

  
export default Dropdown;


