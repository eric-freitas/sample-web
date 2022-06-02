import 'jest-extended/all';
import React from 'react';
import { render } from '@testing-library/react';
import CoalesceRender from '../../src/components/CoalesceRender';


describe("Coalesce Render Component Text", () => {
    it ('should render main value', ()=> {
        const { container } = render(<CoalesceRender toRender={<p>RENDER</p>} defaultVal={<p>NOT TO RENDER</p>} />);
        expect(container.innerHTML).toBe(`<p>RENDER</p>`);
    })

    it ('should render default value', ()=> {
        const { container } = render(<CoalesceRender toRender={null} defaultVal={<p>DEFAULT RENDERED</p>} />);
        expect(container.innerHTML).toBe(`<p>DEFAULT RENDERED</p>`);
    })
});