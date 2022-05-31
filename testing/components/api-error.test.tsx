import 'jest-extended/all';
import React from 'react';
import * as redux from 'react-redux';
import ApiErrorMsg from '../../src/components/ApiErrorMsg';
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import allActions from '../../src/actions';
import rootReducer from '../../src/reducers'
import { configureStore } from '@reduxjs/toolkit';

import '../../src/i18n';
import { ApiExecStatus } from '../../src/models/ApiExec';
import { sleep } from '../../src/static/utils';



describe("Api Error Msg Component test", () => {

    it ("should not render an error message", () => {

        let container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            const store = configureStore({ reducer : rootReducer });
            ReactDOM.render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider> , container);
        })

        expect(container.children.length).toBe(0);
        
    });

    it("should render an error message", () => {
        let container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            const store = configureStore({ reducer : rootReducer });
            ReactDOM.render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider> , container);
            store
                .dispatch(allActions.apiExec.setApiStatus(
                {
                    api		: "api-jest",
                    status 	: ApiExecStatus.Error,
                    error  : {
                        response : {
                            status: 404,
                            data : {
                                msg: "Jest not found"
                            }
                        }
                    }
                })
            );
        })

        expect(container.children.length).toBe(1);
        const [ errorMsg ] = container.children;
        const classes = errorMsg.className.split(" ");
        expect(classes).toContain("error-msg");

        const msgNode = errorMsg.querySelector(".error-msg__body");
        expect(msgNode.textContent).toBe("Jest not found");

    })

    it("should wait and render an error message", async() => {
        let container = document.createElement('div');
        document.body.appendChild(container);

        await act(async() => {
            const store = configureStore({ reducer : rootReducer });
            ReactDOM.render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider> , container);

            expect(container.children.length).toBe(0);
            await sleep(2000);
            
            store
                .dispatch(allActions.apiExec.setApiStatus(
                {
                    api		: "api-jest",
                    status 	: ApiExecStatus.Error,
                    error  : {
                        response : {
                            status: 400,
                            data : {
                                msg: "Jest error"
                            }
                        }
                    }
                })
            );

            const msgNode = container.querySelector(".error-msg__body");
            expect(msgNode.textContent).toBe("Jest error");

        })


    })

});