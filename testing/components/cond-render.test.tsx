import 'jest-extended/all';
import React from 'react';
import ConditionalRendering from '../../src/components/ConditionalRendering';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";

const ifTrue  = (<div className='render-if-true' >TRUE </div>);
const ifFalse = (<div className='render-if-false'>FALSE</div>);
 
describe("Conditional Rendering Component test", () => {

    it ("should render true expression", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<ConditionalRendering condition={true} ifTrue={ifTrue} ifFalse={ifFalse} />, container);
        })

        const true_renderer  = container.querySelector(".render-if-true");
        const false_renderer = container.querySelector(".render-if-false");

        expect(true_renderer).not.toBeNull();
        expect(false_renderer).toBeNull();
    });

    it ("should render false expression", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<ConditionalRendering condition={false} ifTrue={ifTrue} ifFalse={ifFalse} />, container);
        })

        const true_renderer  = container.querySelector(".render-if-true");
        const false_renderer = container.querySelector(".render-if-false");

        expect(true_renderer).toBeNull();
        expect(false_renderer).not.toBeNull();
    });
})