import React              from 'react';
import { Route , Switch } from 'react-router-dom';
/*import ProtectedRoute     from './components/ProtectedRoute';
import UnprotectedRoute   from './components/UnprotectedRoute';
*/
import Home     from '../pages/Home';

export default function Routes() {
    /*return (
        <Switch>
            <Route            component={Login}     path="/"            exact/>
            <UnprotectedRoute component={NewUser}   path="/new_user"    exact/>
            <ProtectedRoute   component={Home}      path="/home"        exact/>
        </Switch>
    )*/

    return (
        <Switch>
            <Route component={Home} path="/" exact/>
        </Switch>
    )
}