import 'jest-extended';
import React from 'react';
import BaseIcon from '../../src/components/Icons/Icon/BaseIcon';
import { render } from '@testing-library/react'; 

describe("Icon Component test", () => {
    const width  = 124;
    const height = width;
    const className = "icon-jest";

    class IconJest extends BaseIcon {
        width     = width;
        height    = height;
        className = className;
        content   = (
            <g className='jest-svg-group'>
                <rect className='jest-a' x="0" y="0" width={50} height={50} fill="white" />
                <rect className='jest-b' x="51" y="51" width={50} height={50} fill="black" />
            </g>
        );    
    }
      
    it ("should render an icon", () => {
        const { container } = render(<IconJest><span>ICON</span></IconJest>);
        expect(container.innerHTML).toBe(`<span class="${className} icon"><svg width="${width}" height="${width}" viewBox="0 0 ${width} ${height}"><g class="jest-svg-group"><rect class="jest-a" x="0" y="0" width="50" height="50" fill="white"></rect><rect class="jest-b" x="51" y="51" width="50" height="50" fill="black"></rect></g></svg></span>`);    
    });
})