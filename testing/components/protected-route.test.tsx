import 'jest-extended/all';
import React from 'react';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history'
import ProtectedRoute from '../../src/components/ProtectedRoute';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import '../../src/i18n';
import { Route, Router, Switch } from 'react-router-dom';

const JestProtected = () => {
    return (
        <section className="protected">
            This is a protected page
        </section>
    )
}

describe("Protected Route Component test", () => {

    const routeHome = (<Route exact path="/"><div>This is home</div></Route> )

    beforeEach(() => {
        
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it ("should redirect to home", () => {

        const spy = jest.spyOn(redux, 'useSelector')
        spy.mockReturnValue({
            currentUser : {
                user     : null,
                loggedIn : false,
                token    : ""
            }
        });

        const history = createMemoryHistory()

        render( 
            <Router history={history}>
                <Switch>
                    {routeHome}
                    <ProtectedRoute exact path="/jest"><JestProtected/></ProtectedRoute>
                </Switch>
            </Router>
        );
        
        history.push("/jest");
        spy.mockRestore();
        
        expect(screen.getByText(/This is home/i)).toBeInTheDocument()
        
    });

    it ("should allow protected route", () => {

        const spy = jest.spyOn(redux, 'useSelector')
        spy.mockReturnValue({
            user     : { id: 1, name: "Jester"},
            loggedIn : true,
            token    : "jest-token"
        });

        const history = createMemoryHistory()

        render( 
                <Router history={history}>
                    <Switch>
                        {routeHome}
                        <ProtectedRoute exact path="/jest"><JestProtected/></ProtectedRoute>
                    </Switch>
                </Router>
        );
        
        history.push("/jest");
        spy.mockRestore();
        
        expect(screen.getByText(/This is a protected page/i)).toBeInTheDocument()
        
    });

});