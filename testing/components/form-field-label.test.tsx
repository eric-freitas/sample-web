import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import FormFieldLabel from '../../src/components/FormFieldLabel';
import IconMock from '../mocks/mock-icon';


describe("Form Field Label Component Test", () => {
   
    it("should render a simple form label", () => {
        const { container } = render(<FormFieldLabel>Label</FormFieldLabel>);
        expect(container.innerHTML).toBe(`<label>Label</label>`);
    })

    it("should render a simple form label with a class", () => {
        const { container } = render(<FormFieldLabel className='jest-label-class'>Label</FormFieldLabel>);
        expect(container.innerHTML).toBe(`<label class="jest-label-class">Label</label>`);
    })

    it("should render a simple form label with a heading Icon", () => {
        const { container: icon } = render(<IconMock />);
        const { container } = render(<FormFieldLabel headingIcon={<IconMock/>}>Label</FormFieldLabel>);
        expect(container.innerHTML).toBe(`<label>${icon.innerHTML}Label</label>`);
    })

    it("should render a simple form label with a trailing Icon", () => {
        const { container: icon } = render(<IconMock />);
        const { container } = render(<FormFieldLabel trailingIcon={<IconMock/>}>Label</FormFieldLabel>);
        expect(container.innerHTML).toBe(`<label>Label${icon.innerHTML}</label>`);
    })

    it("should render a form label with all together", () => {
        const { container: iconA } = render(<IconMock className='icon-a' />);
        const { container: iconB } = render(<IconMock className='icon-b' />);
        const { container } = render(<FormFieldLabel className='jest class label' headingIcon={<IconMock className='icon-a'/>} trailingIcon={<IconMock className='icon-b'/>}>Label</FormFieldLabel>);
        expect(container.innerHTML).toBe(`<label class="jest class label">${iconA.innerHTML}Label${iconB.innerHTML}</label>`);
    })


})