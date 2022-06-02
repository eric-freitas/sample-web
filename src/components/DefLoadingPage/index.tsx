import React  from 'react';
import IconLoading from '../../components/Icons/Loading';

import { useTranslation } from 'react-i18next';

import './index.scss';
import CoalesceRender from '../CoalesceRender';


export interface DefaultLoadingPageProps {
	text? : string,
	icon? : JSX.Element,
	logo? : JSX.Element
}

export default function DefaultLoadingPage(props: DefaultLoadingPageProps){

	const { text, icon, logo } = props;

	const { t } = useTranslation();

    return (
        <main className="app">
    	    <section className='loading'>
				{logo}

				<CoalesceRender
					toRender   = { icon }
					defaultVal = { <IconLoading /> }
				/>
				<p>{text ?? t("main.loading")}</p>
		    </section>
  	    </main>
    )
}