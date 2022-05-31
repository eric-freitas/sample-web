import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoadingPage from './pages/Loading';
import Routes from './routes';
import App from './App'

import rootReducer from './reducers'

import './style.scss';
import './fonts.scss';
import './i18n';


const store = configureStore({
	reducer: rootReducer
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App loadingPage={<LoadingPage/>} routes={<Routes/>} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

