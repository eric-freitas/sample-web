/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import NumericInput from '../../src/components/NumericInput';
import userEvent from '@testing-library/user-event';
import IconMock from '../mocks/mock-icon';
import IconRequired from '../../src/components/Icons/Required';
import { FormFieldStatus } from '../../src/components/FormField';


describe("Numeric Input Component Test", () => {
   
    it("should render a simple numeric input", () => {
        const { container } = render(<NumericInput className='jest-input' label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input and not be able to change its value to a string", () => {
        const { container } = render(<NumericInput className='jest-input' label='jest'></NumericInput>);
        
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "jest");
        input = container.querySelector("input");
        expect(input.value).toBe("");
    })

    
    it("should render a simple numeric input and be able to change its value to a number", () => {
        const { container } = render(<NumericInput className='jest-input' label='jest'></NumericInput>);
        
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1234");
        input = container.querySelector("input");
        expect(input.value).toBe("1234");
    })

    it("should render a simple numeric input with fieldClassName", () => {
        const { container } = render(<NumericInput className='jest-input' fieldClassName='jest-field' label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="jest-field input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with helper", () => {
        const { container } = render(<NumericInput className='jest-input' helperText='Jest Helper' label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset><small class="form-field__helper">Jest Helper</small>`);
    })

    it("should render a simple numeric input with id", () => {
        const { container } = render(<NumericInput className='jest-input' id='jest-id' label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" id="jest-id" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with invalid prop", () => {
        const { container } = render(<NumericInput className='jest-input' invalid label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with invalid text", () => {
        const { container: contA } = render(<NumericInput className='jest-input' invalidText='Jest Invalid text' label='jest'></NumericInput>);
        expect(contA.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);

        const { container: contB } = render(<NumericInput className='jest-input' invalid invalidText='Jest Invalid Text' label='jest'></NumericInput>);
        expect(contB.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset><small class="form-field__invalid-text">Jest Invalid Text</small>`)
    })

    it("should render a simple numeric input with leadingIcon icon", () => {
        const { container } = render(<NumericInput leadingIcon={<IconMock/>} className="jest-input" label='jest'></NumericInput>);
        const { container: iconMock } = render(<IconMock/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial">${iconMock.innerHTML}<input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })
    
    it("should render a simple numeric input and fire onChange event", () => {
        let newVal : number = 0;
        const changed = (x: number) => {
            newVal = x;
        }

        expect(newVal).toBe(0);
        const { container } = render(<NumericInput onChange={changed} className="jest-input" label='jest'></NumericInput>);
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1234");
        expect(newVal).toBe(1234);
    })

    it("should render a simple numeric input with prefix text", () => {
        const { container } = render(<NumericInput prefix='Jest Prefix' className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with required prop", () => {
        const { container } = render(<NumericInput required className="jest-input" label='jest'></NumericInput>);
        const { container: iconRequired } = render(<IconRequired/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest${iconRequired.innerHTML}</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should invalidate an input with required prop", () => {
        const { container } = render(<NumericInput required invalidText='Jest Required - Invalid' className="jest-input" label='jest'></NumericInput>);

        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1");
        input = container.querySelector("input");
        expect(input.value).toBe("1");
        userEvent.clear(input);
        input = container.querySelector("input");
        expect(input.value).toBe("");
        const { container: iconRequired } = render(<IconRequired/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest${iconRequired.innerHTML}</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset><small class="form-field__invalid-text">Jest Required - Invalid</small>`);
    })

    
    it("should render a simple numeric input with enabled status", () => {
        const { container } = render(<NumericInput status={FormFieldStatus.Enabled} className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with disabled status", () => {
        const { container } = render(<NumericInput status={FormFieldStatus.Disabled} className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input disabled"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" disabled="" value=""></span></div></fieldset>`);
    })

    it("should render a simple numeric input with suffix", () => {
        const { container } = render(<NumericInput suffix='Jest Suffix' className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span><span class="form-field__content"><small>Jest Suffix</small></span></div></fieldset>`);
    })

    it("should render a simple numeric input with initial value", () => {
        const initialText = 1001;
        const { container } = render(<NumericInput value={initialText} className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value="${initialText}"></span></div></fieldset>`);
        
        let input = container.querySelector("input");
        input.focus();
        userEvent.type(input, "1");
        input = container.querySelector("input");
        expect(input.value).toBe(`${initialText}1`);
    })

    it("should render a simple numeric input with trailing Icon", () => {
        const { container } = render(<NumericInput trailingIcon={<IconMock/>} className="jest-input" label='jest'></NumericInput>);
        const { container: iconMock } = render(<IconMock/>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span><span class="form-field__content">${iconMock.innerHTML}</span></div></fieldset>`);
    })

    it("should render a simple numeric input with valid prop", () => {
        const { container } = render(<NumericInput valid className="jest-input" label='jest'></NumericInput>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-input valid"><label>jest</label><div class="input form-field"><span class="form-field__content form-field__content_initial"><input type="number" inputmode="decimal" value=""></span></div></fieldset>`);
    })

    it("should render a numeric input with all together", () => {
        const { container } = render(<NumericInput 
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
            value={1000}
            trailingIcon={<IconMock className='mock2'/>}
        />);
        const { container: mock1 } = render(<IconMock className='mock1'/>);
        const { container: mock2 } = render(<IconMock className='mock2'/>);
        const { container: iconRequired } = render(<IconRequired/>);


        expect(container.innerHTML).toBe(`<fieldset class="jest-input invalid"><label>jest${iconRequired.innerHTML}</label><div class="jest-field-class input form-field"><span class="form-field__content form-field__content_initial">${mock1.innerHTML}<small>Jest Prefix</small><input type="number" inputmode="decimal" id="jest-id" value="1000"></span><span class="form-field__content"><small>Jest Suffix</small>${mock2.innerHTML}</span></div></fieldset><small class="form-field__helper">Jest Helper</small><small class="form-field__invalid-text">Jest Invalid Text</small>`);
    })
})