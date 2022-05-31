import React  from 'react';
import IconLoading from '../../components/Icons/Loading';

import { useTranslation } from 'react-i18next';

import './index.scss';

export default function LoadingPage(){

	const { t } = useTranslation();

    return (
        <main className="app">
    	    <section className='loading'>
    			<IconLoading />
				<p>{t("main.loading")}</p>
		    </section>
  	    </main>
    )
}