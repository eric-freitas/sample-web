/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended/all'
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Button, { SubmitAction } from '../../src/components/Button';
import userEvent from '@testing-library/user-event';
import { FormFieldStatus } from '../../src/components/FormField';

describe("Button Component Test", () => {
   
    it("should render a simple button", () => {
        const { container } = render(<Button text="jest-button" />);
        expect(container.innerHTML).toBe(`<button class="button" type="button">jest-button</button>`);
    })

    it("should render an activated button", () => {
        const { container } = render(<Button text="jest-button" activated />);
        expect(container.innerHTML).toBe(`<button class="button activated" type="button">jest-button</button>`);
    })

    it("should render a borderless button", () => {
        const { container } = render(<Button text="jest-button" borderless />);
        expect(container.innerHTML).toBe(`<button class="button borderless" type="button">jest-button</button>`);
    })

    it("should render a button with new classes", () => {
        const { container } = render(<Button text="jest-button" className='new-class1 new-class2' />);
        expect(container.innerHTML).toBe(`<button class="button new-class1 new-class2" type="button">jest-button</button>`);
    })

    it("should render a button with a hint", () => {
        const { container } = render(<Button text="jest-button" hint='jest tip' />);
        expect(container.innerHTML).toBe(`<button class="button" title="jest tip" type="button">jest-button</button>`);
    })

    it("should render a button with an id", () => {
        const { container } = render(<Button text="jest-button" id='jest-id' />);
        expect(container.innerHTML).toBe(`<button id="jest-id" class="button" type="button">jest-button</button>`);
    })

    it("should render a button with a name", () => {
        const { container } = render(<Button text="jest-button" name='jest-name' />);
        expect(container.innerHTML).toBe(`<button name="jest-name" class="button" type="button">jest-button</button>`);
    })

    it("should fire an event on a button click", () => {
        let fired = false;
        const onClick = () => fired = true;

        const { container } = render(<Button text="jest-button" onClick={onClick} />);
        expect(container.innerHTML).toBe(`<button class="button" type="button">jest-button</button>`);
        expect(fired).toBe(false);

        const button = container.querySelector("button");
        userEvent.click(button);
        expect(fired).toBe(true);
    })
    
    it("should render an enabled button", () => {
        const { container } = render(<Button text="jest-button" status={FormFieldStatus.Enabled} />);
        expect(container.innerHTML).toBe(`<button class="button" type="button">jest-button</button>`);
    })

    it("should render a disabled button", () => {
        let fired = false;
        const onClick = () => fired = true;
        const { container } = render(<Button text="jest-button" onClick={onClick} status={FormFieldStatus.Disabled} />);
        expect(container.innerHTML).toBe(`<button class="button" disabled="" type="button">jest-button</button>`);
        expect(fired).toBe(false);

        const button = container.querySelector("button");
        userEvent.click(button);
        expect(fired).toBe(false);
    })

    it("should render a button with form data", () => {
        const submitAction: SubmitAction = {
            encryptionType: "jest-encryption",
            form : "jest-form",
            method: 'get',
            target: "jest-target",
            type: 'reset',
            url: "jest-url",
            validate: true,
            value: "jest-value"
        }
        const { container } = render(<Button text="jest-button" submitAction={submitAction}/>);
        expect(container.innerHTML).toBe(`<button class="button" form="jest-form" formaction="jest-url" formenctype="jest-encryption" formmethod="get" formnovalidate="" formtarget="jest-target" type="reset" value="jest-value">jest-button</button>`);
    })

    it("should render a button with all together", () => {
        let fired = false;
        const onClick = () => fired = true;

        const { container } = render(<Button text="Button" activated borderless className='jest-class1 jest-class-2' hint='jest-hint' id='jest-id' name='jest-name' status={FormFieldStatus.Enabled} onClick={onClick}/>);
        expect(container.innerHTML).toBe(`<button name="jest-name" id="jest-id" class="button jest-class1 jest-class-2 borderless activated" title="jest-hint" type="button">Button</button>`);
        expect(fired).toBe(false);

        const button = container.querySelector("button");
        userEvent.click(button);
        expect(fired).toBe(true);
    })


})