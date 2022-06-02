import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApiErrorMsg from './components/ApiErrorMsg';
import ApiStatusLoading from './components/ApiStatus';
import AppContext from './context';
import DeveloperTools from './sections/DeveloperTools';

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
	routes : JSX.Element
}

function MainPage(props: InitialSectionProps) {

	const { onRef, routes } = props;
	
	const [ pageToRender, setPageToRender ] = useState<JSX.Element>(defaultRouter(routes));

	useEffect(() => {
		onRef?.call(null, (newPage? : JSX.Element) => {
			setPageToRender(newPage ?? defaultRouter(routes));
		});
	}, [ onRef, routes ]);

	return pageToRender;
}

export interface AppProps {
	routes 		: JSX.Element,
	loadingPage : JSX.Element
}

export default function App(props: AppProps) {

	const { routes, loadingPage } = props;

	const defaultContext = {
		loadingPage
	}

	let onChangePage : SetPageToRenderCallback;

	const onRef = (c: SetPageToRenderCallback) => {
		onChangePage = c;
	}

	const onRenderPage = (newPage? : JSX.Element) => {
		onChangePage?.call(null, newPage);
	};

	return (
		<AppContext.Provider value={defaultContext}>
			<Suspense fallback={loadingPage}>
				<main className="App">
				<section>
						<ApiStatusLoading />
						<MainPage onRef={onRef} routes={routes}/>
						<ApiErrorMsg />
					</section>
					<DeveloperTools onRenderPage={onRenderPage}/>
				</main>
			</Suspense>
		</AppContext.Provider>
  	);
}