/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended/all';
import React from 'react';
import Panel, { PanelType } from '../../src/components/Panel';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconClose from '../../src/components/Icons/Close';
import IconMock from '../mocks/mock-icon';
 
describe("Panel Component test", () => {

    it ("should render a regular panel", () => {
        const { container } = render(<Panel title='Jest Panel'><div>My content</div></Panel>);
        expect(container.innerHTML).toBe(`<article class="panel"><header><span class="panel__title"><h2>Jest Panel</h2></span></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
    });

    it ("should render a panel with classes", () => {
        const { container } = render(<Panel title='Jest Panel' className='jest-class-1 jest-class-2'><div>My content</div></Panel>);
        expect(container.innerHTML).toBe(`<article class="jest-class-1 jest-class-2 panel"><header><span class="panel__title"><h2>Jest Panel</h2></span></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
    });

    it ("should render a closable panel", () => {

        let closed = false;
        const onClose = () => closed = true;

        const { container } = render(<Panel onClose={onClose} title='Jest Panel' closable><div>My content</div></Panel>);
        const { container: iconClose } =render(<IconClose/>);
        expect(container.innerHTML).toBe(`<article class="panel"><header><span class="panel__title"><h2>Jest Panel</h2></span><button class="button panel__close-button borderless" type="button">${iconClose.innerHTML}</button></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
        expect(closed).toBeFalse();
        const button = container.querySelector(".panel__close-button");
        userEvent.click(button);
        expect(container.innerHTML).toBe("");
        expect(closed).toBeTrue();
    });

    it ("should render a panel with an icon", () => {
        const { container } = render(<Panel title='Jest Panel' icon={<IconMock/>}><div>My content</div></Panel>);
        const { container: mockIcon } = render(<IconMock />);
        
        expect(container.innerHTML).toBe(`<article class="panel"><header><span class="panel__title">${mockIcon.innerHTML}<h2>Jest Panel</h2></span></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
    });

    it ("should render a standard panel", () => {
        const { container } = render(<Panel type={PanelType.Standard} title='Jest Panel'><div>My content</div></Panel>);
        expect(container.innerHTML).toBe(`<article class="panel"><header><span class="panel__title"><h2>Jest Panel</h2></span></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
    });

    it ("should render a box panel", () => {
        const { container } = render(<Panel type={PanelType.Box} title='Jest Panel'><div>My content</div></Panel>);
        expect(container.innerHTML).toBe(`<article class="panel box"><header><span class="panel__title"><h2>Jest Panel</h2></span></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
    });

    it ("should render a not visible panel", () => {
        const { container } = render(<Panel visible={false} title='Jest Panel'><div>My content</div></Panel>);
        expect(container.innerHTML).toBe(``);
    });
    
    it ("should render a box panel with all together", () => {
        let closed = false;
        const onClose = () => closed = true;

        const { container } = render(<Panel icon={<IconMock/>} visible={true} className="jest-class-1 jest-class-2" type={PanelType.Box} onClose={onClose} title='Jest Panel' closable><div>My content</div></Panel>);
        const { container: mockIcon  } = render(<IconMock />);
        const { container: iconClose } = render(<IconClose/>);
        expect(container.innerHTML).toBe(`<article class="jest-class-1 jest-class-2 panel box"><header><span class="panel__title">${mockIcon.innerHTML}<h2>Jest Panel</h2></span><button class="button panel__close-button borderless" type="button">${iconClose.innerHTML}</button></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
        expect(closed).toBeFalse();
        const button = container.querySelector(".panel__close-button");
        userEvent.click(button);
        expect(container.innerHTML).toBe("");
        expect(closed).toBeTrue();
    });

    it ("should render a standard panel with all together", () => {
        let closed = false;
        const onClose = () => closed = true;

        const { container } = render(<Panel icon={<IconMock/>} visible={true} className="jest-class-1 jest-class-2" type={PanelType.Standard} onClose={onClose} title='Jest Panel' closable><div>My content</div></Panel>);
        const { container: mockIcon } = render(<IconMock />);
        const { container: iconClose } = render(<IconClose/>);
        expect(container.innerHTML).toBe(`<article class="jest-class-1 jest-class-2 panel"><header><span class="panel__title">${mockIcon.innerHTML}<h2>Jest Panel</h2></span><button class="button panel__close-button borderless" type="button">${iconClose.innerHTML}</button></header><section><div class="panel__content"><div>My content</div></div></section></article>`);
        expect(closed).toBeFalse();
        const button = container.querySelector(".panel__close-button");
        userEvent.click(button);
        expect(container.innerHTML).toBe("");
        expect(closed).toBeTrue();
    });

})