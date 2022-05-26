import React               from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector }     from 'react-redux';
import AppState from '../../models/AppState';
import ConditionalRendering from '../ConditionalRendering';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...props }) =>  {

    const currentUser = useSelector((state:AppState) => state.currentUser)
    
    return <ConditionalRendering 
        condition   = {!!(currentUser.loggedIn && currentUser.token)} 
        ifTrue      = {(<Route {...props}>{children}</Route>)}
        ifFalse     = {(<Redirect to="/"/>)}
    />
};

  
export default ProtectedRoute;

