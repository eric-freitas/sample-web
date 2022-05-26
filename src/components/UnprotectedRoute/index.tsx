import React               from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector }     from 'react-redux';
import AppState from '../../models/AppState';


const UnprotectedRoute = (props: any) =>  {

    const currentUser = useSelector((state:AppState) => state.currentUser)
    if (!currentUser.token) {
        return <Redirect to="/"/>
    } else if (currentUser.loggedIn) {
        return <Redirect to="/home"/>
    } else {
        return <Route {...props} />
    }
  };

  
export default UnprotectedRoute;

