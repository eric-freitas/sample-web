import 'jest-extended/all';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProgressBar from '../../src/components/ProgressBar';
import { sleep } from '../../src/static/utils';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe("Progress Bar Component Test", () => {
   
    it("should render a simple progress bar", async() => {
        await act(async() => {
            const { container } = render(<ProgressBar time={5}></ProgressBar>);
            const expected = `<span role="progressbar" class="progress-bar" style="animation-duration: 5s;"></span>`
            expect(container.innerHTML).toBe(expected);
            await sleep(1250);
            expect(container.innerHTML).toBe(expected);
            const pBar = container.querySelector(".progress-bar");

            fireEvent.animationEnd(pBar);

            expect(container.innerHTML).toBe("");
        });
    }, 30000)

    it("should render a simple progress bar with different time", async() => {
        await act(async () => {
            const { container } = render(<ProgressBar time={4}></ProgressBar>);
            const expected = `<span role="progressbar" class="progress-bar" style="animation-duration: 4s;"></span>`
            expect(container.innerHTML).toBe(expected);
            await sleep(1250);
            expect(container.innerHTML).toBe(expected);
            const pBar = container.querySelector(".progress-bar");
            fireEvent.animationEnd(pBar);
            expect(container.innerHTML).toBe("");
        });
    }, 30000)

})