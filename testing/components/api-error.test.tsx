/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import 'jest-extended/all';
import React from 'react';
import * as redux from 'react-redux';
import ApiErrorMsg from '../../src/components/ApiErrorMsg';
import allActions from '../defaultActions';
import rootReducer from '../defaultReducer'
import { configureStore } from '@reduxjs/toolkit';

import { ApiExecStatus } from '../../src/models/ApiExec';
import { render } from '@testing-library/react';
import { sleep } from '../../src/static/utils';
import { act } from 'react-dom/test-utils';

describe("Api Error Msg Component test", () => {

    it ("should not render an error message", () => {

        const store = configureStore({ reducer : rootReducer });
        const { container } = render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider> );
        expect(container.children.length).toBe(0);
        
    });

    it("should render an error message", () => {
        const store = configureStore({ reducer : rootReducer });
        const { container } = render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider>);
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

        expect(container.children.length).toBe(1);
        const [ errorMsg ] = container.children;
        const classes = errorMsg.className.split(" ");
        expect(classes).toContain("error-msg");

        const msgNode = errorMsg.querySelector(".error-msg__body");
        expect(msgNode.textContent).toBe("Jest not found");

    })

    it("should wait and render an error message and then, not again", async() => {
        await act(async() => {
        
            const store = configureStore({ reducer : rootReducer });
            const { container } = render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider>);

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

            store
            .dispatch(
                allActions.apiExec.setApiStatus(
                    {
                        api		: "api-jest",
                        status 	: ApiExecStatus.Ok
                    })
            );

            const { container: newContainer } = render(<redux.Provider store={store}><ApiErrorMsg/></redux.Provider>);
            expect(newContainer.children.length).toBe(0);
        });
    }, 30000)

});