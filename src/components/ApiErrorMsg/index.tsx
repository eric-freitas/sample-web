import React from 'react';
import { useSelector } from 'react-redux';
import { ApiExecDataStore, ApiExecStatus } from '../../models/ApiExec';
import AppState from '../../models/AppState';
import errorMsgHandler from '../../static/errorMsgHandler';
import ErrorMessage from '../ErrorMessage';
import RenderIfTrue from '../RenderIfTrue';

export default function ApiErrorMsg () {

    const { httpStatusToTitle } = errorMsgHandler();

    const renderErrorMessage = (errorData: ApiExecDataStore) => {
        const errorMsgDefinition = httpStatusToTitle(errorData.error.response?.status || 0) ?? {};
        const errorMsgText = (
                errorData.error.response?.data?.err     || 
                errorData.error.response?.data?.msg     || 
                errorData.error.response?.data?.error   || 
                errorData.error.response?.error         || 
                errorData.error                         || 
            "")?.toString() ?? "";

        return (<ErrorMessage 
                    key     = { new Date().toString() } 
                    title   = { errorMsgDefinition?.title ?? "" } 
                    icon    = { errorMsgDefinition?.icon } 
                    message = { errorMsgText } 
                />);
    }
        
    const apiStatus   = useSelector((state:AppState) => state.apiExec);
    const errorMessage = apiStatus
        ?.filter(e => e.status === ApiExecStatus.Error && e.error && e.error.response)
        ?.map(renderErrorMessage);

    return (
        <RenderIfTrue condition={errorMessage.length > 0}>
            {errorMessage}
        </RenderIfTrue>
    );

}
  