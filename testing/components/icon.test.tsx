import 'jest-extended';
import React from 'react';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import Icon from '../../src/components/Icons/Icon';
 
import { fireEvent } from '@testing-library/react';

describe("Icon Component test", () => {

    it ("should render an icon", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<Icon> <span>ICON</span> </Icon>, container);
        })

        const parent = container.querySelector(".icon");
        expect(parent.children.length).toBe(1);
        const classes = parent.className.split(" ").filter(Boolean);
        expect(classes).toStrictEqual(["icon"]);
        
        const [ icon_content ] = parent.children;
        expect(icon_content.textContent).toBe("ICON");
    });

    it ("should render an icon with a class", () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<Icon className='jest-icon'> <span>ICON</span> </Icon>, container);
        })

        const parent = container.querySelector(".icon");
        expect(parent.children.length).toBe(1);
        const classes = parent.className.split(" ").filter(Boolean);
        expect(classes).toContain("icon")
        expect(classes).toContain("jest-icon")
        expect(classes).toBeArrayOfSize(2);
        
        const [ icon_content ] = parent.children;
        expect(icon_content.textContent).toBe("ICON");

    })


    it ("should fire an event onClick", () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        let clicked = false;

        const done = () => {
            clicked = true;
        }

        act(() => {
            ReactDOM.render(<Icon className='jest-icon' onClick={done}> <span>ICON</span> </Icon>, container);
        })

        const parent = container.querySelector(".icon");
        fireEvent.click(parent);

        expect(clicked).toBeTrue();

    })
})