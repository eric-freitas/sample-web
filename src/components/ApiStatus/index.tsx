import React from 'react';
import { useSelector } from 'react-redux';
import AppState from '../../models/AppState';
import IconLoading from '../Icons/Loading';
import { ApiExecStatus } from "../../models/ApiExec";
import './index.scss';
import RenderIfTrue from '../RenderIfTrue';

export default function ApiStatusLoading () {
    const apiStatus = 
        useSelector( (state: AppState) => state.apiExec )
            ?.find(e => 
                    e.status === ApiExecStatus.Init || e.status === ApiExecStatus.Loading
            );
    
    return <RenderIfTrue condition={!!apiStatus}>
                (<IconLoading className="api-status"/>)
            </RenderIfTrue>;
}