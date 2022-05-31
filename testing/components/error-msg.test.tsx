import 'jest-extended/all';
import React from 'react';
import ErrorMessage from '../../src/components/ErrorMessage';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import IconLoading from '../../src/components/Icons/Loading';
import { sleep } from '../../src/static/utils';

const jestErrorTitle   = "Error Title";
const jestErrorMessage = "Error Message";

let icon = <IconLoading/>;

 
describe("Error Msg Component test", () => {

    const assertContent = (content: Element) => {
        expect(content.className).toBe("error-msg__content");
        expect(content.children.length).toBe(2);

        const div_header = content.querySelector(".error-msg__header");
        const div_body   = content.querySelector(".error-msg__body");

        expect(div_header.textContent).toBe(jestErrorTitle);
        expect(div_body.textContent).toBe(jestErrorMessage);
    }

    it ("should render an error message without icon", async() => {


        let container = document.createElement('div');
        document.body.appendChild(container);
        await act(async() => {
            ReactDOM.render(<ErrorMessage autoHide={false} title={jestErrorTitle} message={jestErrorMessage}  />, container);
        

            const parent = container.querySelector(".error-msg");
            expect(parent.children.length).toBe(2);
            
            const [ div_icon, div_content ] = parent.children;
            expect(div_icon.className).toBe("error-msg__icon");
            expect(div_icon.children.length).toBe(0);

            assertContent(div_content);
        });

    });

    it ("should render an error message with icon", async() => {


        let container = document.createElement('div');
        document.body.appendChild(container);
        await act(async() => {
            ReactDOM.render(<ErrorMessage autoHide={false}  title={jestErrorTitle} message={jestErrorMessage} icon={icon}  />, container);
        

            const parent = container.querySelector(".error-msg");
            expect(parent.children.length).toBe(2);
            
            const [ div_icon, div_content ] = parent.children;
            
            expect(div_icon.className).toBe("error-msg__icon");
            expect(div_icon.children.length).toBe(1);

            let iconContainer = document.createElement('div');
            act(() => {
                ReactDOM.render(icon, iconContainer);
            })

            const [ icon_element ] = div_icon.children;
            expect(icon_element.querySelector("svg")).toStrictEqual(iconContainer.querySelector("svg"));
            
            assertContent(div_content);

        });
    });

    it ("should not auto hide error msg", async() => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        await act(async() => {
            ReactDOM.render(<ErrorMessage autoHide={false}  title={jestErrorTitle} message={jestErrorMessage}  />, container);

            let element = container.querySelector(".error-msg");
            expect(element).not.toBeNull();

            await sleep(12000);

            element = container.querySelector(".error-msg");
            expect(element).not.toBeNull();
            
            
        });
    }, 30000);

    it ("should auto hide error msg", async() => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        await act(async() => {
            ReactDOM.render(<ErrorMessage time={2} title={jestErrorTitle} message={jestErrorMessage}  />, container);

            let element = container.querySelector(".error-msg");
            expect(element).not.toBeNull();

            await sleep(2200);

            element = container.querySelector(".error-msg");
            expect(element).toBeNull();
        });
    }, 30000)

})