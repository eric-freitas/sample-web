/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import TextInput from '../../src/components/TextInput';
import userEvent from '@testing-library/user-event';
import IconMock from '../mocks/mock-icon';
import IconRequired from '../../src/components/Icons/Required';
import { FormFieldStatus } from '../../src/components/FormField';


describe("Text Input Component Test", () => {
   
    it("should render a simple text input", () => {
        const { container } = render(<TextInput className='jest-input' label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
        //<fieldset class="jest-input"><label>jest</label><div class="form-field input"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>
    })

    it("should render a simple text input and be able to change its value", () => {
        const { container } = render(<TextInput className='jest-input' label='jest'></TextInput>);
        
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "jest");
        input = container.querySelector("input");
        expect(input.value).toBe("jest");
    })

    it("should render a simple text input with fieldClassName", () => {
        const { container } = render(<TextInput className='jest-input' fieldClassName='jest-field' label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="jest-field input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with helper", () => {
        const { container } = render(<TextInput className='jest-input' helperText='Jest Helper' label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset><small class="form-field__helper">Jest Helper</small>`);
    })

    it("should render a simple text input with id", () => {
        const { container } = render(<TextInput className='jest-input' id='jest-id' label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" id="jest-id" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with invalid prop", () => {
        const { container } = render(<TextInput className='jest-input' invalid label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with invalid text", () => {
        const { container: contA } = render(<TextInput className='jest-input' invalidText='Jest Invalid text' label='jest'></TextInput>);
        expect(contA.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);

        const { container: contB } = render(<TextInput className='jest-input' invalid invalidText='Jest Invalid Text' label='jest'></TextInput>);
        expect(contB.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset><small class="form-field__invalid-text">Jest Invalid Text</small>`)
    })

    it("should render a simple text input with leadingIcon icon", () => {
        const { container } = render(<TextInput leadingIcon={<IconMock/>} className="jest-input" label='jest'></TextInput>);
        const { container: iconMock } = render(<IconMock/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial">${iconMock.innerHTML}<input type="text" value=""></span></div></fieldset>`);
    })
    
    it("should render a simple text input and fire onChange event", () => {
        let newText : string = "";
        const changed = (x: string) => {
            newText = x;
        }

        expect(newText).toBe("");
        const { container } = render(<TextInput onChange={changed} className="jest-input" label='jest'></TextInput>);
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "jest");
        expect(newText).toBe("jest");
    })

    it("should render a simple text input with prefix text", () => {
        const { container } = render(<TextInput prefix='Jest Prefix' className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><input type="text" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with required prop", () => {
        const { container } = render(<TextInput required className="jest-input" label='jest'></TextInput>);
        const { container: iconRequired } = render(<IconRequired/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest${iconRequired.innerHTML}</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
    })

    it("should invalidate an input with required prop", () => {
        const { container } = render(<TextInput required invalidText='Jest Required - Invalid' className="jest-input" label='jest'></TextInput>);

        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1");
        input = container.querySelector("input");
        expect(input.value).toBe("1");
        userEvent.clear(input);
        input = container.querySelector("input");
        expect(input.value).toBe("");
        const { container: iconRequired } = render(<IconRequired/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest${iconRequired.innerHTML}</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset><small class="form-field__invalid-text">Jest Required - Invalid</small>`);
    })

    
    it("should render a simple text input with enabled status", () => {
        const { container } = render(<TextInput status={FormFieldStatus.Enabled} className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with disabled status", () => {
        const { container } = render(<TextInput status={FormFieldStatus.Disabled} className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input disabled"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" disabled="" value=""></span></div></fieldset>`);
    })

    it("should render a simple text input with suffix", () => {
        const { container } = render(<TextInput suffix='Jest Suffix' className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span><span class="form-field__content"><small>Jest Suffix</small></span></div></fieldset>`);
    })

    it("should render a simple text input with initial value", () => {
        const initialText = 'Jest Text';
        const { container } = render(<TextInput text={initialText} className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value="${initialText}"></span></div></fieldset>`);
        
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1");
        input = container.querySelector("input");
        expect(input.value).toBe(`${initialText}1`);
    })

    it("should render a simple text input with trailing Icon", () => {
        const { container } = render(<TextInput trailingIcon={<IconMock/>} className="jest-input" label='jest'></TextInput>);
        const { container: iconMock } = render(<IconMock/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span><span class="form-field__content">${iconMock.innerHTML}</span></div></fieldset>`);
    })

    it("should render a simple text input with valid prop", () => {
        const { container } = render(<TextInput valid className="jest-input" label='jest'></TextInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input valid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="text" value=""></span></div></fieldset>`);
    })

    it("should render a text input with all together", () => {
        const { container } = render(<TextInput 
            className="jest-input" label='jest'
            fieldClassName='jest-field-class'
            helperText='Jest Helper'
            id='jest-id'
            invalid
            invalidText='Jest Invalid Text'
            leadingIcon={<IconMock className='mock1'/>}
            prefix='Jest Prefix'
            required
            suffix='Jest Suffix'
            text='Error Text'
            trailingIcon={<IconMock className='mock2'/>}
        />);
        const { container: mock1 } = render(<IconMock className='mock1'/>);
        const { container: mock2 } = render(<IconMock className='mock2'/>);
        const { container: iconRequired } = render(<IconRequired/>);


        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest${iconRequired.innerHTML}</label><div class="jest-field-class input form-field"><span class="form-field__content form-field__content_initial">${mock1.innerHTML}<small>Jest Prefix</small><input type="text" id="jest-id" value="Error Text"></span><span class="form-field__content"><small>Jest Suffix</small>${mock2.innerHTML}</span></div></fieldset><small class="form-field__helper">Jest Helper</small><small class="form-field__invalid-text">Jest Invalid Text</small>`);
    })
})