import 'jest-extended/all';
import React from 'react';
import Footer from '../../src/components/Footer';
import { render } from '@testing-library/react';
 
describe("Footer Component test", () => {

    it ("should render", () => {
        const { container } = render(<Footer className="my-footer"><div className='to-render'>OK</div></Footer>);
        expect(container.innerHTML).toBe(`<footer class="footer my-footer"><div class="to-render">OK</div></footer>`);
    });

})