import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoadingPage from './pages/Loading';
import Routes from './routes';
import App from './App'
import AppProps from './models/AppProps'

import appReducer from './reducers'

import './style.scss';
import './fonts.scss';
import appActions from './actions';

function MainApp() {

	const store = configureStore({
		reducer: appReducer
	});

	const appData : AppProps = {
		loadingPage : <LoadingPage />,
		routes	    : <Routes/>,
		actions		: appActions
	}

	return (
		<React.StrictMode>
			<Provider store={store}>
				<App  {...appData} />
			</Provider>
		</React.StrictMode>
	);
}

const root = document.getElementById('root');
ReactDOM.render(<MainApp/>,	root);

