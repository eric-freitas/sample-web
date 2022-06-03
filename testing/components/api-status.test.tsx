import 'jest-extended/all';
import React from 'react';
import ApiStatus from '../../src/components/ApiStatus';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../src/reducers';
import { Provider } from 'react-redux';
import allActions from '../../src/actions';
import { ApiExecStatus } from '../../src/models/ApiExec';
import { render } from '@testing-library/react';
import { sleep } from '../../src/static/utils';
 
describe("Api Status Component test", () => {


    it ("should not render a loading icon", () => {
        const store = configureStore({ reducer : rootReducer });
        const { container } = render(<Provider store={store}><ApiStatus/></Provider>);

        expect(container.children.length).toBe(0);
        
    });

    it ("should render a loading icon and remove it after a while", async() => {

        const store = configureStore({ reducer : rootReducer });
        store
            .dispatch(
                allActions.apiExec.setApiStatus(
                    {
                        api		: "jest-test",
                        status 	: ApiExecStatus.Loading
                    })
            );
        const { container } = render(<Provider store={store}><div className='top'><ApiStatus/></div></Provider>);

        let content = container.querySelector(".top");

        expect(content.children.length).toBe(1);
        await sleep(1000);
        
        content = container.querySelector(".api-status");
        expect(content).not.toBeNull();

        store
            .dispatch(
                allActions.apiExec.setApiStatus(
                    {
                        api		: "jest-test",
                        status 	: ApiExecStatus.Ok
                    })
            );

        await sleep(1000);
        content = container.querySelector(".api-status");
        expect(content).toBeNull();
    });


});


/*dispatch(allActions.apiExec.setStatus(
					{
						api		: url,
						status 	: ApiExecStatus.Ok
					})
				);*/