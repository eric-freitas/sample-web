import 'jest-extended/all';
import React from 'react';
import RenderIfTrue from '../../src/components/RenderIfTrue';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";

const toRender = (<div className='render-if-true' >TRUE </div>);
 
describe("Rendering If True Component test", () => {

    it ("should render", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<RenderIfTrue condition={true}>{toRender}</RenderIfTrue>, container);
        })

        const element = container.querySelector(".render-if-true");

        expect(element).not.toBeNull();
    });

    it ("should not render", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<RenderIfTrue condition={false}>{toRender}</RenderIfTrue>, container);
        })

        const element = container.querySelector(".render-if-true");

        expect(element).toBeNull();
    });
})