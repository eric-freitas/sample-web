import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import Small from '../../src/components/SmallText';

describe("Small Text Component Test", () => {
   
    it("should render a simple small text", () => {
        const { container } = render(<Small>small text</Small>);
        expect(container.innerHTML).toBe(`<small>small text</small>`);
    })

    it("should render nothing", () => {
        const { container } = render(<Small></Small>);
        expect(container.innerHTML).toBe(``);
    })

    it("should render a small text with a class", () => {
        const { container } = render(<Small className='jest small-text'>small text</Small>);
        expect(container.innerHTML).toBe(`<small class="jest small-text">small text</small>`);
    })

    it("should not render a small text with a class", () => {
        const { container } = render(<Small className='jest small-text'></Small>);
        expect(container.innerHTML).toBe(``);
    })


})