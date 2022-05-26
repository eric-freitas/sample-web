import 'jest-extended/all';
import React from 'react';
import Footer from '../../src/components/Footer';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";

const toRender = (<div className='to-render'>OK</div>);
 
describe("Footer Component test", () => {

    it ("should render", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<Footer className="my-footer">{toRender}</Footer>, container);
        })

        const element = container.querySelector(".footer");
        expect(element.classList.contains("my-footer")).toBe(true);

        const rendered = element.querySelector(".to-render");
        expect(rendered).not.toBeNull();
        expect(rendered.textContent).toBe("OK");

    });

})