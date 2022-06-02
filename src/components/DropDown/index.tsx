import React, { Children, ReactNode, useEffect, useState } from 'react';
import { appendClassNames } from '../../static/utils';
import CoalesceRender from '../CoalesceRender';
import FormField, { BaseFormFieldProps, FormFieldStatus } from '../FormField';
import IconChevron from '../Icons/Chevron';
import RenderIfTrue from '../RenderIfTrue';

import './index.scss';

export type DropDownItem = string | number | ReactNode;

export interface DropdownProps extends BaseFormFieldProps {
    id     : string,
    value? : DropDownItem | null
    
    onSelected? : (item: DropDownItem) => void,

    children?   : DropDownItem | DropDownItem[] 
}

//TODO test and refactor

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

    return (
        <div className='dropdown'>
            <FormField 
                {...props}
                
                onClick        = { onClick   } 
                status         = { status    }
                invalid        = { isInvalid }
                fieldClassName = { appendClassNames(fieldClassName, "select"           ) }
                className      = { appendClassNames(className, show ? "selected" : null) }
                trailingIcon   = { <CoalesceRender 
                                        toRender   = { trailingIcon   }
                                        defaultVal = { <IconChevron rotate={show ? 180 : undefined} /> }
                                   /> }
                siblings       = { <RenderIfTrue condition={show} >
                                        <ul key="options" id={`${id}_options`} className='options'>
                                            { Children.map(children, renderChild) }
                                        </ul>
                                   </RenderIfTrue> }
            >
                <span role="combobox" aria-controls={`${id}_options`} aria-expanded={show} id={id} className='input-area input'>
                    {selected}
                </span>
            </FormField>
        </div>
    );
};

  
export default Dropdown;


