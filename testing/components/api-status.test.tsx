import 'jest-extended/all';
import React from 'react';
import ApiStatus from '../../src/components/ApiStatus';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../src/reducers';
import { Provider } from 'react-redux';
import allActions from '../../src/actions';
import { ApiExecStatus } from '../../src/models/ApiExec';
 
describe("Api Status Component test", () => {


    it ("should not render a loading icon", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            const store = configureStore({ reducer : rootReducer });
            ReactDOM.render(<Provider store={store}><ApiStatus/></Provider> , container);
        })

        expect(container.children.length).toBe(0);
        
    });

    it ("should render a loading icon", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            const store = configureStore({ reducer : rootReducer });
            store
                .dispatch(
                    allActions.apiExec.setStatus(
                        {
                            api		: "jest-test",
                            status 	: ApiExecStatus.Loading
                        })
                );
            ReactDOM.render(<Provider store={store}><ApiStatus/></Provider> , container);
        })
        
        expect(container.children.length).toBe(1);
        const [ loadingIcon ] = container.children;
        const classes = loadingIcon.className.split(" ");
        expect(classes).toContain("icon");
        expect(classes).toContain("step-spinner");
        expect(classes).toContain("api-status");
    });


});