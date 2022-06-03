import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import FormField from '../../src/components/FormField';
import userEvent from '@testing-library/user-event';
import IconMock from '../mocks/mock-icon';
import IconRequired from '../../src/components/Icons/Required';
import { FormFieldStatus } from '../../src/components/FormField';


describe("Form Field Component Test", () => {
   
    let mockIcon       = "";
    let required       = "";
    beforeAll(() => {
        const { container: mock } = render(<IconMock />);
        mockIcon = mock.innerHTML;
        const { container: iconRequired } = render(<IconRequired/>);
        required = iconRequired.innerHTML;
    })

    it("should render a simple form field", () => {
        const { container } = render(<FormField label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with class", () => {
        const { container } = render(<FormField className='jest-class-1 jest-class-2' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class="jest-class-1 jest-class-2"><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with field class", () => {
        const { container } = render(<FormField fieldClassName='jest-field-class1 jest-field-class2' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="jest-field-class1 jest-field-class2 form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with helper text", () => {
        const { container } = render(<FormField helperText='Jest Helper Text' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset><small class="form-field__helper">Jest Helper Text</small>`);
    })

    it("should render an invalid form field", () => {
        const { container } = render(<FormField invalid label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class="invalid"><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field without its invalid text", () => {
        const { container } = render(<FormField invalidText='Not to render' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render an invalid form field with invalid text", () => {
        const { container } = render(<FormField invalidText='Jest Invalid Text' invalid label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class="invalid"><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset><small class="form-field__invalid-text">Jest Invalid Text</small>`);
    })

    it("should render a form field with leading icon", () => {
        const { container } = render(<FormField leadingIcon={<IconMock/>} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial">${mockIcon}<div>Field</div></span></div></fieldset>`);
    })

    it("should trigger onClick event", () => {
        let clickCount = 0;
        const onClick = () => clickCount++;

        const { container } = render(<FormField onClick={onClick} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
        expect(clickCount).toBe(0);

        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(clickCount).toBe(1);

        userEvent.click(fieldset);
        expect(clickCount).toBe(2);
    })

    it("should render a form field with prefix", () => {
        const { container } = render(<FormField prefix='Jest Prefix' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><div>Field</div></span></div></fieldset>`);
    })

    it("should render a required form field", () => {
        const { container } = render(<FormField required label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field${required}</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with siblings", () => {
        const { container } = render(<FormField siblings={<div>SIBLINGS</div>} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset><div>SIBLINGS</div>`);
    })

    it("should render an enabled form field", () => {
        const { container } = render(<FormField status={FormFieldStatus.Enabled} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a disabled form field", () => {
        const { container } = render(<FormField status={FormFieldStatus.Disabled} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class="disabled"><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with suffix", () => {
        const { container } = render(<FormField suffix='Jest Suffix' label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span><span class="form-field__content"><small>Jest Suffix</small></span></div></fieldset>`);
    })

    it("should render a form field with trailing icon", () => {
        const { container } = render(<FormField trailingIcon={<IconMock/>} label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class=""><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span><span class="form-field__content">${mockIcon}</span></div></fieldset>`);
    })

    it("should render a valid form field", () => {
        const { container } = render(<FormField valid label="Jest Form Field"><div>Field</div></FormField>);
        expect(container.innerHTML).toBe(`<fieldset class="valid"><label>Jest Form Field</label><div class="form-field"><span class="form-field__content form-field__content_initial"><div>Field</div></span></div></fieldset>`);
    })

    it("should render a form field with all together", () => {
        let clickCount = 0;
        const onClick = () => clickCount++;

        const { container } = render(
            <FormField 
                onClick         = {onClick} 
                label           = "Jest Form Field"
                className       = 'jest-class1 jest-class2'
                fieldClassName  = 'jest-field-class1 jest-field-class2'
                helperText      = 'Jest Helper Text'
                invalid
                invalidText     = 'Jest Invalid Text'
                leadingIcon     = {<IconMock className='iconA'/>}
                prefix          = 'Jest Prefix'
                required
                siblings        = {<div>SIBLINGS</div>}
                status          = {FormFieldStatus.Disabled}
                suffix          = 'Jest Suffix'
                trailingIcon    = {<IconMock className='iconB'/>}
            >
                <div>Field</div>
            </FormField>
        );

        const { container: iconA } = render(<IconMock className='iconA'/>);
        const { container: iconB } = render(<IconMock className='iconB'/>);

        expect(container.innerHTML).toBe(`<fieldset class="jest-class1 jest-class2 disabled invalid"><label>Jest Form Field${required}</label><div class="jest-field-class1 jest-field-class2 form-field"><span class="form-field__content form-field__content_initial">${iconA.innerHTML}<small>Jest Prefix</small><div>Field</div></span><span class="form-field__content"><small>Jest Suffix</small>${iconB.innerHTML}</span></div></fieldset><div>SIBLINGS</div><small class="form-field__helper">Jest Helper Text</small><small class="form-field__invalid-text">Jest Invalid Text</small>`);
        expect(clickCount).toBe(0);

        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(clickCount).toBe(1);

        userEvent.click(fieldset);
        expect(clickCount).toBe(2);
    })

})