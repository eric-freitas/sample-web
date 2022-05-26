import React, { Suspense } from 'react';

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

export default function App() {
	return (
    	<Suspense fallback={<LoadingPage />}>
      		<main className="App">
				<section>
					<ApiStatusLoading />
					
					<BrowserRouter basename='sample-web'>
						<Routes />
					</BrowserRouter>

					<ApiErrorMsg />
				</section>
				<DeveloperTools/>
			</main>
    	</Suspense>
  	);
}