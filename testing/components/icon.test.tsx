/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended';
import React from 'react';
import Icon from '../../src/components/Icons/Icon';
import { render } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';

describe("Icon Component test", () => {

    it ("should render an icon", () => {
        const { container } = render(<Icon><span>ICON</span></Icon>);
        expect(container.innerHTML).toBe(`<span class="icon"><span>ICON</span></span>`);
    });

    it ("should render an icon with a class", () => {
        const { container } = render(<Icon className='jest-class1 jest-class2'><span>ICON</span></Icon>);
        expect(container.innerHTML).toBe(`<span class="jest-class1 jest-class2 icon"><span>ICON</span></span>`);
    });

    it ("should fire onClick event", () => {
        let fired = false;
        const onClick = () => fired = true;

        const { container } = render(<Icon onClick={onClick}><span>ICON</span></Icon>);
        expect(container.innerHTML).toBe(`<span class="icon"><span>ICON</span></span>`);
        expect(fired).toBe(false);

        const button = container.querySelector(".icon");
        userEvent.click(button);
        expect(fired).toBe(true);
        
        expect(container.innerHTML).toBe(`<span class="icon"><span>ICON</span></span>`);
    });

})