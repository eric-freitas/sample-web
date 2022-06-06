import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoadingPage from './pages/Loading';
import Routes from './routes';
import App from './App'
import AppProps from './models/AppProps'

import rootReducer from './reducers'

import './style.scss';
import './fonts.scss';
import './i18n';

const store = configureStore({
	reducer: rootReducer
});

const appData : AppProps = {
	loadingPage : <LoadingPage />,
	routes	    : <Routes/>
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App  {...appData} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

