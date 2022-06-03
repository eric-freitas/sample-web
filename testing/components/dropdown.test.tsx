import 'jest-extended/all'
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Dropdown, { DropDownItem } from '../../src/components/DropDown';
import userEvent from '@testing-library/user-event';
import { FormFieldStatus } from '../../src/components/FormField';
import IconChevron from '../../src/components/Icons/Chevron';
import IconRequired from '../../src/components/Icons/Required';
import IconMock from '../mocks/mock-icon';

describe("Dropdown Component Test", () => {

    let chevron        = "";
    let rotatedChevron = "";
    let mockIcon       = "";
    let required       = "";
    beforeAll(() => {
        const { container } = render(<IconChevron />);
        chevron = container.innerHTML;
        const { container: rotated } = render(<IconChevron rotate={180} />);
        rotatedChevron = rotated.innerHTML;
        const { container: mock } = render(<IconMock />);
        mockIcon = mock.innerHTML;
        const { container: iconRequired } = render(<IconRequired/>);
        required = iconRequired.innerHTML;
    })

    it("should render a simple dropdown with strings", () => {
        const { container } = render(<Dropdown label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    })

    it("should render a simple dropdown with numbers", () => {
        const { container } = render(<Dropdown label="jest-drop">{[1, 2, 3]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">1</span></li><li><span class="dropdown__simple-item">2</span></li><li><span class="dropdown__simple-item">3</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    })

    it("should render a simple dropdown with divs", () => {
        const { container } = render(<Dropdown label="jest-drop"><div>A</div><div>B</div></Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><div>A</div></li><li><div>B</div></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    })

    it("should select an item from a dropdown", () => {
        const { container } = render(<Dropdown label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const option = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(option);

        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    })

    it("should select a div from a dropdown", () => {
        const { container } = render(<Dropdown label="jest-drop"><div>A</div><div id="to-select">B</div></Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><div>A</div></li><li><div id="to-select">B</div></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const toSelect = container.querySelector("#to-select");
        userEvent.click(toSelect);
        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"><div id="to-select">B</div></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    })

    it("should render a simple dropdown with id", () => {
        const { container } = render(<Dropdown id="jest-id" label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="jest-id_options" aria-expanded="false" id="jest-id" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        expect(container.innerHTML).toBe(collapsed);
    });

    it("should render a simple dropdown with class", () => {
        const { container } = render(<Dropdown className='jest-class1 jest-class2' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class="jest-class1 jest-class2"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="jest-class1 jest-class2 selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;
        expect(container.innerHTML).toBe(collapsed);

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should render a simple dropdown with field class", () => {
        const { container } = render(<Dropdown fieldClassName='jest-field-class1 jest-field-class2' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="jest-field-class1 jest-field-class2 select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        expect(container.innerHTML).toBe(collapsed);
    });

    it("should render a simple dropdown with helper text", () => {
        const { container } = render(<Dropdown helperText='Jest Helper Text' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset><small class="form-field__helper">Jest Helper Text</small></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul><small class="form-field__helper">Jest Helper Text</small></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should render an invalid dropdown", () => {
        const { container } = render(<Dropdown invalid label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class="invalid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected invalid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should render a dropdown but not with invalid text", () => {
        const { container } = render(<Dropdown invalidText='Not to render' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should render a dropdown but with invalid text", () => {
        const { container } = render(<Dropdown invalid invalidText='Jest Invalid Text' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class="invalid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset><small class=\"form-field__invalid-text\">Jest Invalid Text</small></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected invalid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul><small class=\"form-field__invalid-text\">Jest Invalid Text</small></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should render dropdown with leading icon", () => {
        const { container } = render(<Dropdown leadingIcon={<IconMock />} label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial">${mockIcon}<span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial">${mockIcon}<span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    });

    it("should trigger an event when dropdown is selected", () => {

        let selectCount: number = 0;
        let selectedItem: DropDownItem = null;
        const onSelect = (v:DropDownItem) => {
            selectCount++;
            selectedItem =v;
        }

        const { container } = render(<Dropdown onSelected={onSelect} label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(selectCount).toBe(0);
        expect(selectedItem).toBe(null);

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        expect(selectCount).toBe(0);
        expect(selectedItem).toBe(null);

        const option = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(option);

        expect(selectCount).toBe(1);
        expect(selectedItem).toBe("A");

        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    });

    it("should render a dropdown with prefix", () => {
        const { container } = render(<Dropdown prefix='Jest Prefix' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded  = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;
        const selected  = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><small>Jest Prefix</small><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const toSelect = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(toSelect);

        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    });

    it("should validate a required dropdown", () => {
        const { container } = render(<Dropdown required label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop${required}</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop${required}</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        let afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        const invalid_collapsed = `<div class="dropdown"><fieldset class="invalid"><label>jest-drop${required}</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        expect(afterCollapse).toBe(invalid_collapsed);

        userEvent.click(fieldset);
        const toSelect = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(toSelect);

        afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        const valid_collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop${required}</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        expect(afterCollapse).toBe(valid_collapsed);
    });

    it("should render an enabled dropdown", () => {
        const { container } = render(<Dropdown status={FormFieldStatus.Enabled} label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    })

    it("should render an disabled dropdown", () => {
        const { container } = render(<Dropdown status={FormFieldStatus.Disabled} label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class="disabled"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(collapsed);
    })
    
    it("should render a dropdown with suffix", () => {
        const { container } = render(<Dropdown suffix='Jest Suffix' label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content"><small>Jest Suffix</small>${chevron}</span></div></fieldset></div>`;
        const expanded  = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content"><small>Jest Suffix</small>${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;
        const selected  = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content"><small>Jest Suffix</small>${chevron}</span></div></fieldset></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const toSelect = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(toSelect);

        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    });

    it("should render a dropdown with different trailingIcon", () => {
        const { container } = render(<Dropdown trailingIcon={<IconMock/>} label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${mockIcon}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${mockIcon}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(collapsed);
    })

    it("should render a valid dropdown", () => {
        const { container } = render(<Dropdown valid label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class="valid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected valid"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        userEvent.click(fieldset);
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(collapsed);
    })

    it("should render a dropdown with a selected string value", () => {
        const { container } = render(<Dropdown value="B" label="jest-drop">{["A", "B", "C"]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">B</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input">B</span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">A</span></li><li><span class="dropdown__simple-item">B</span></li><li><span class="dropdown__simple-item">C</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const option = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(option);

        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">A</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    })

    it("should render a dropdown with a selected number value", () => {
        const { container } = render(<Dropdown value={2} label="jest-drop">{[1, 2, 3]}</Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">2</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input">2</span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><span class="dropdown__simple-item">1</span></li><li><span class="dropdown__simple-item">2</span></li><li><span class="dropdown__simple-item">3</span></li></ul></div>`;

        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const option = container.querySelector(".dropdown__simple-item:first-child");
        userEvent.click(option);

        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input">1</span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    })

    it("should render a dropdown with a div value", () => {
        const { container } = render(<Dropdown value="div-2" label="jest-drop"><div id="div-1">A</div><div id="div-2">B</div></Dropdown>);
        const collapsed = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"><div id="div-2">B</div></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const expanded = `<div class="dropdown"><fieldset class="selected"><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="true" class="input-area input"><div id="div-2">B</div></span></span><span class="form-field__content">${rotatedChevron}</span></div></fieldset><ul id="dropdown_options" class="options"><li><div id="div-1">A</div></li><li><div id="div-2">B</div></li></ul></div>`;

      
        expect(container.innerHTML).toBe(collapsed);
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);

        const option = container.querySelector(".options li:first-child");
        userEvent.click(option);

        const selected = `<div class="dropdown"><fieldset class=""><label>jest-drop</label><div class="select form-field"><span class="form-field__content form-field__content_initial"><span role="combobox" aria-controls="dropdown_options" aria-expanded="false" class="input-area input"><div id="div-1">A</div></span></span><span class="form-field__content">${chevron}</span></div></fieldset></div>`;
        const afterCollapse = container.innerHTML.replace(/class=\"icon icon-chevron\" style=\"\"/, "class=\"icon icon-chevron\"");
        expect(afterCollapse).toBe(selected);
    })

    it ('should render a dropdown with all together', () => {
        let selectedItem: DropDownItem = null;
        const onSelect = (v:DropDownItem) => selectedItem = v;

        const { container } = render(
            <Dropdown 
                onSelected      = {onSelect} 
                value           = "div-2" 
                label           = "jest-drop"
                className       = 'jest-class-1 jest-class-2'
                fieldClassName  = 'field-jest-class-1 field-jest-class-2'
                helperText      = 'Jest Helper Text'
                id              = 'jest-id'
                valid
                required
                invalidText     = 'Jest Invalid'
                leadingIcon     = {<IconMock className='leading-icon'/>}
                prefix          = 'Jest Prefix'
                status          = {FormFieldStatus.Enabled}
                suffix          = 'Jest Suffix'
                trailingIcon    = {<IconMock className='trailing-icon'/>}
            >
                {["",<div key="A" id="div-1">A</div>,<div key="B" id="div-2">B</div>]}
            </Dropdown>);

        const { container: leadingIconMock } = render(<IconMock className='leading-icon'/>);
        const leadingIcon = leadingIconMock.innerHTML;

        const { container: trailingIconMock } = render(<IconMock className='trailing-icon'/>);
        const trailingIcon = trailingIconMock.innerHTML;

        const collapsed = `<div class="dropdown"><fieldset class="jest-class-1 jest-class-2 valid"><label>jest-drop${required}</label><div class="field-jest-class-1 field-jest-class-2 select form-field"><span class="form-field__content form-field__content_initial">${leadingIcon}<small>Jest Prefix</small><span role="combobox" aria-controls="jest-id_options" aria-expanded="false" id="jest-id" class="input-area input"><div id="div-2">B</div></span></span><span class="form-field__content"><small>Jest Suffix</small>${trailingIcon}</span></div></fieldset><small class="form-field__helper">Jest Helper Text</small></div>`;
        const expanded  = `<div class="dropdown"><fieldset class="jest-class-1 jest-class-2 selected valid"><label>jest-drop${required}</label><div class="field-jest-class-1 field-jest-class-2 select form-field"><span class="form-field__content form-field__content_initial">${leadingIcon}<small>Jest Prefix</small><span role="combobox" aria-controls="jest-id_options" aria-expanded="true" id="jest-id" class="input-area input"><div id="div-2">B</div></span></span><span class="form-field__content"><small>Jest Suffix</small>${trailingIcon}</span></div></fieldset><ul id="jest-id_options" class="options"><li><span class="dropdown__simple-item"></span></li><li><div id="div-1">A</div></li><li><div id="div-2">B</div></li></ul><small class="form-field__helper">Jest Helper Text</small></div>`;
        const selected  = `<div class="dropdown"><fieldset class="jest-class-1 jest-class-2 valid"><label>jest-drop${required}</label><div class="field-jest-class-1 field-jest-class-2 select form-field"><span class="form-field__content form-field__content_initial">${leadingIcon}<small>Jest Prefix</small><span role="combobox" aria-controls="jest-id_options" aria-expanded="false" id="jest-id" class="input-area input"><div id="div-1">A</div></span></span><span class="form-field__content"><small>Jest Suffix</small>${trailingIcon}</span></div></fieldset><small class="form-field__helper">Jest Helper Text</small></div>`;
        const expandedWithSelected = `<div class="dropdown"><fieldset class="jest-class-1 jest-class-2 selected valid"><label>jest-drop${required}</label><div class="field-jest-class-1 field-jest-class-2 select form-field"><span class="form-field__content form-field__content_initial">${leadingIcon}<small>Jest Prefix</small><span role="combobox" aria-controls="jest-id_options" aria-expanded="true" id="jest-id" class="input-area input"><div id="div-1">A</div></span></span><span class="form-field__content"><small>Jest Suffix</small>${trailingIcon}</span></div></fieldset><ul id="jest-id_options" class="options"><li><span class="dropdown__simple-item"></span></li><li><div id="div-1">A</div></li><li><div id="div-2">B</div></li></ul><small class="form-field__helper">Jest Helper Text</small></div>`;
        const invalid   = `<div class="dropdown"><fieldset class="jest-class-1 jest-class-2 invalid"><label>jest-drop${required}</label><div class="field-jest-class-1 field-jest-class-2 select form-field"><span class="form-field__content form-field__content_initial">${leadingIcon}<small>Jest Prefix</small><span role="combobox" aria-controls="jest-id_options" aria-expanded="false" id="jest-id" class="input-area input"></span></span><span class="form-field__content"><small>Jest Suffix</small>${trailingIcon}</span></div></fieldset><small class="form-field__helper">Jest Helper Text</small><small class="form-field__invalid-text">Jest Invalid</small></div>`;

        expect(container.innerHTML).toBe(collapsed);
        expect(selectedItem).toBe(null);
        
        const fieldset = container.querySelector("fieldset");

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expanded);
        expect(selectedItem).toBe(null);

        let option = container.querySelector("#div-1");
        userEvent.click(option);
        expect((selectedItem as any).props.id).toBe("div-1");

        expect(container.innerHTML).toBe(selected);

        userEvent.click(fieldset);
        expect(container.innerHTML).toBe(expandedWithSelected);
        expect(selectedItem).not.toBe(null);

        option = container.querySelector(".options li:first-child");
        userEvent.click(option);
        expect(selectedItem).toBe("");

        expect(container.innerHTML).toBe(invalid);

    })

})