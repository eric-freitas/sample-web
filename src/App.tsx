import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApiErrorMsg from './components/ApiErrorMsg';
import ApiStatusLoading from './components/ApiStatus';
import DeveloperTools from './sections/DeveloperTools';
import AppProps from './models/AppProps';
import appDataManager from './static/appDataManager';
import DefaultLoadingPage from './components/DefLoadingPage';
import { useTranslation } from 'react-i18next';
import i18nStart from './i18n';

/*	const currentUser = useSelector((state:AppState) => state.currentUser);
	useEffect(() => {
		

	}, [ currentUser ])
	*/

type SetPageToRenderCallback = (page?: JSX.Element) => void;

const defaultRouter = (routes: JSX.Element) => (
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		{routes}
	</BrowserRouter>
)

interface InitialSectionProps {
	onRef? : (callback: SetPageToRenderCallback) => void;
}

function MainPage(props: InitialSectionProps) {

	const { onRef } = props;
	const { routes } = appDataManager.get();
	const [ pageToRender, setPageToRender ] = useState<JSX.Element>(defaultRouter(routes));

	useEffect(() => {
		onRef?.call(null, (newPage? : JSX.Element) => {
			setPageToRender(newPage ?? defaultRouter(routes));
		});
	}, [ onRef, routes ]);

	return pageToRender;
}

export default function App(props: AppProps) {
	let { loadingPage } = props ?? {};
	loadingPage = loadingPage ?? <DefaultLoadingPage />
	appDataManager.set({ ...props, loadingPage });

	let onChangePage : SetPageToRenderCallback;
	const onRef = (c: SetPageToRenderCallback) => {
		onChangePage = c;
	}
	const onRenderPage = (newPage? : JSX.Element) => {
		onChangePage?.call(null, newPage);
	};

    const translation = useTranslation();
	if (!translation.i18n.t) {
		i18nStart({ fallbackLanguage: 'en', language: 'pt-BR'});
	}
	
	return (
		<Suspense fallback={loadingPage}>
			<main className="App">
				<section>
					<ApiStatusLoading />
					<MainPage onRef={onRef} />
					<ApiErrorMsg />
				</section>
				<DeveloperTools onRenderPage={onRenderPage}/>
			</main>
		</Suspense>
  	);
}