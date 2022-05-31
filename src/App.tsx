import React, { Suspense, useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import ApiErrorMsg from './components/ApiErrorMsg';
import ApiStatusLoading from './components/ApiStatus';
import LoadingPage from './pages/Loading';

import Routes from './routes';
import DeveloperTools from './sections/DeveloperTools';

/*	const currentUser = useSelector((state:AppState) => state.currentUser);
	useEffect(() => {
		

	}, [ currentUser ])
	*/

type SetPageToRenderCallback = (page?: JSX.Element) => void;

const defaultRouter = (
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Routes />
	</BrowserRouter>
)

interface InitialSectionProps {
	onRef? : (callback: SetPageToRenderCallback) => void;
}

function InitialSection(props: InitialSectionProps) {

	const { onRef } = props;
	
	const [ pageToRender, setPageToRender ] = useState<JSX.Element>(defaultRouter);

	useEffect(() => {
		onRef?.call(null, (newPage? : JSX.Element) => {
			setPageToRender(newPage ?? defaultRouter);
		});
	}, [ onRef ]);

	return (
		<section>
			<ApiStatusLoading />
			{pageToRender}
			<ApiErrorMsg />
		</section>
	)
}

export default function App() {

	let onChangePage : SetPageToRenderCallback;

	const onRef = (c: SetPageToRenderCallback) => {
		onChangePage = c;
	}

	const onRenderPage = (newPage? : JSX.Element) => {
		onChangePage?.call(null, newPage);
	};

	return (
    	<Suspense fallback={<LoadingPage />}>
      		<main className="App">
				<InitialSection onRef={onRef}/>
				<DeveloperTools onRenderPage={onRenderPage}/>
			</main>
    	</Suspense>
  	);
}