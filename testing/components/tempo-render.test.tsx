import 'jest-extended/all';
import React from 'react';
import TempoRendering from '../../src/components/TempoRendering';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import { sleep } from '../../src/static/utils';

const toRender  = (<div className='tempo-renderer'> TEMPO </div>);
 
describe("Tempo Rendering Component test", () => {

    it ("should render for 2 secs", async() => {

        let container = document.createElement('div');
        document.body.appendChild(container);
        await act(async() => {
            ReactDOM.render(<TempoRendering time={2000}>{toRender}</TempoRendering>, container);

            let rendered = container.querySelector(".tempo-renderer");
            expect(rendered).not.toBeNull();
            await sleep(2200);
            rendered = container.querySelector(".tempo-renderer");
            expect(rendered).toBeNull();
        });
        
    });
})