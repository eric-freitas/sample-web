import 'jest-extended/all';
import React from 'react';
import CheatCodeRevealing from '../../src/components/CheatCodeRevealing';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import { SpecialKey } from '../../src/static/sniffKey';

const toRender = (<div className='render-if-cheat'>TRUE</div>);

const  defaultKeyPressEventData = {
    altKey      : false,
    bubbles     : true,
    cancelable  : true,
    charCode    : 0,
    code        : "Digit1",
    composed    : true,
    ctrlKey     : false,
    detail      : 0,
    isComposing : false,
    key         : "1",
    keyCode     : 49,
    location    : 0,
    metaKey     : false,
    repeat      : false,
    shiftKey    : false,
    view        : window,
    which       : 49
};
 
describe("Cheat Code Revealing Component test", () => {

    it ("should not render", () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<CheatCodeRevealing sequence={["Digit1", "Digit2"]} specialKeys={[SpecialKey.Control]}>
                                {toRender}
                            </CheatCodeRevealing>
                , container);
        })

        const element = container.querySelector(".render-if-cheat");
        expect(element).toBeNull();
    });

    it ("should render", async() => {

        await act(async() => {
            let container = document.createElement('div');
            document.body.appendChild(container);
    
            ReactDOM.render(<CheatCodeRevealing sequence={["Digit1", "Digit2"]} specialKeys={[SpecialKey.Control]}>
                                {toRender}
                            </CheatCodeRevealing>
                , container);

            let element = container.querySelector(".render-if-cheat");
            expect(element).toBeNull();

            let keyPressEvent = new KeyboardEvent('keydown', {
                ...defaultKeyPressEventData,
                code    : "CtrlLeft",
                key     : "Ctrl",
                keyCode : 17,
                which   : 17
            });
            
            document.dispatchEvent(keyPressEvent);
            element = container.querySelector(".render-if-cheat");
            expect(element).toBeNull();

            keyPressEvent = new KeyboardEvent('keydown', {
                ...defaultKeyPressEventData,
                code    : "Digit1",
                key     : "1",
                keyCode : 49,
                which   : 49,
                ctrlKey : true
            });
            document.dispatchEvent(keyPressEvent);
            element = container.querySelector(".render-if-cheat");
            expect(element).toBeNull();

            keyPressEvent = new KeyboardEvent('keydown', {
                ...defaultKeyPressEventData,
                code    : "Digit2",
                key     : "2",
                keyCode : 50,
                which   : 50,
                ctrlKey : true
            });
            document.dispatchEvent(keyPressEvent);
            console.log(document.body.outerHTML);
            console.log(container.outerHTML);
            element = container.querySelector(".render-if-cheat");
            expect(element).not.toBeNull();
        });
    });

});