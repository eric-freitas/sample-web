import 'jest-extended/all'
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import DefLoadingPage from '../../src/components/DefLoadingPage';
import IconLoading from '../../src/components/Icons/Loading';
import IconMock from '../mocks/mock-icon';

describe("Default Loading Page Component Test", () => {
   
    it("should render a default loading page", () => {
        const { container } = render(<DefLoadingPage/>);
        const { container: loadingIcon } = render(<IconLoading/>);
        expect(container.innerHTML).toBe(`<main class="app"><section class="loading">${loadingIcon.innerHTML}<p>main.loading</p></section></main>`);
    })

    it("should render a loading page with mock icon", () => {
        const { container } = render(<DefLoadingPage icon={<IconMock/>} />);
        const { container: icon } = render(<IconMock/>);
        expect(container.innerHTML).toBe(`<main class="app"><section class="loading">${icon.innerHTML}<p>main.loading</p></section></main>`);
    })

    it("should render a loading page with mock icon for logo", () => {
        const { container } = render(<DefLoadingPage logo={<IconMock/>} />);
        const { container: logo } = render(<IconMock/>);
        const { container: loadingIcon } = render(<IconLoading/>);
        expect(container.innerHTML).toBe(`<main class="app"><section class="loading">${logo.innerHTML}${loadingIcon.innerHTML}<p>main.loading</p></section></main>`);
    })

    it("should render a loading page with text", () => {
        const { container } = render(<DefLoadingPage text='JEST' />);
        const { container: icon } = render(<IconLoading/>);
        expect(container.innerHTML).toBe(`<main class="app"><section class="loading">${icon.innerHTML}<p>JEST</p></section></main>`);
    })

    it("should render a loading page with all together", () => {
        const { container } = render(<DefLoadingPage logo={<IconMock className='logo'/>} icon={<IconMock className='loading'/>} text='JEST' />);
        const { container: logo } = render(<IconMock className='logo'/>);
        const { container: loadingIcon } = render(<IconMock className='loading'/>);
        expect(container.innerHTML).toBe(`<main class="app"><section class="loading">${logo.innerHTML}${loadingIcon.innerHTML}<p>JEST</p></section></main>`);
    })

})