import 'jest-extended/all';
import React from 'react';
import ErrorMessage from '../../src/components/ErrorMessage';
import { render } from '@testing-library/react';
import { sleep } from '../../src/static/utils';
import IconMock from '../mocks/mock-icon';
import { act } from 'react-dom/test-utils';
import ProgressBar from '../../src/components/ProgressBar';

const jestErrorTitle   = "Error Title";
const jestErrorMessage = "Error Message";



describe("Error Msg Component test", () => {

    let mockIcon = "";
    beforeAll(() => {
        const { container: mock } = render(<IconMock />);
        mockIcon = mock.innerHTML;
    })

    it ("should render an error message without icon", async() => {
        const { container } = render(<ErrorMessage autoHide={false} title={jestErrorTitle} message={jestErrorMessage}  />);
        expect(container.innerHTML).toBe(`<footer class="footer error-msg"><aside class="error-msg__icon"></aside><section class="error-msg__content"><div class="error-msg__header">${jestErrorTitle}</div><div class="error-msg__body">${jestErrorMessage}</div></section></footer>`);
    });

    it ("should render an error message with icon", async() => {
        const { container } = render(<ErrorMessage icon={<IconMock/>} autoHide={false} title={jestErrorTitle} message={jestErrorMessage}  />);
        expect(container.innerHTML).toBe(`<footer class="footer error-msg"><aside class="error-msg__icon">${mockIcon}</aside><section class="error-msg__content"><div class="error-msg__header">${jestErrorTitle}</div><div class="error-msg__body">${jestErrorMessage}</div></section></footer>`);
    });

    it ("should not auto hide error msg", async() => {
        await act(async() => {
            const { container } = render(<ErrorMessage icon={<IconMock/>} autoHide={false} title={jestErrorTitle} message={jestErrorMessage}  />);
            const toCompare = `<footer class="footer error-msg"><aside class="error-msg__icon">${mockIcon}</aside><section class="error-msg__content"><div class="error-msg__header">${jestErrorTitle}</div><div class="error-msg__body">${jestErrorMessage}</div></section></footer>`;
            expect(container.innerHTML).toBe(toCompare);
            await sleep(12000);
            expect(container.innerHTML).toBe(toCompare);
        });
    }, 30000);

    it ("should auto hide error msg after default time", async() => {

        const { container: progressBar } = render(<ProgressBar time={10}/>);

        await act(async() => {
            const { container } = render(<ErrorMessage icon={<IconMock/>} title={jestErrorTitle} message={jestErrorMessage}  />);
            const toCompare = `<footer class="footer error-msg">${progressBar.innerHTML}<aside class="error-msg__icon">${mockIcon}</aside><section class="error-msg__content"><div class="error-msg__header">${jestErrorTitle}</div><div class="error-msg__body">${jestErrorMessage}</div></section></footer>`;
            expect(container.innerHTML).toBe(toCompare);
            await sleep(2500);
            expect(container.innerHTML).toBe(toCompare);
            await sleep(8000);
            expect(container.innerHTML).toBe("");
        });
    }, 30000);

    it ("should auto hide error msg after specific time", async() => {

        const { container: progressBar } = render(<ProgressBar time={2}/>);

        await act(async() => {
            const { container } = render(<ErrorMessage icon={<IconMock/>} time={2} title={jestErrorTitle} message={jestErrorMessage}  />);
            const toCompare = `<footer class="footer error-msg">${progressBar.innerHTML}<aside class="error-msg__icon">${mockIcon}</aside><section class="error-msg__content"><div class="error-msg__header">${jestErrorTitle}</div><div class="error-msg__body">${jestErrorMessage}</div></section></footer>`;
            expect(container.innerHTML).toBe(toCompare);
            await sleep(1000);
            expect(container.innerHTML).toBe(toCompare);
            await sleep(1250);
            expect(container.innerHTML).toBe("");
        });
    }, 30000);

})