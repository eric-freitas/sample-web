import React  from 'react';
import IconLoading from '../../components/Icons/Loading';

import { useTranslation } from 'react-i18next';

import './index.scss';
import DefaultLoadingPage from '../../components/DefLoadingPage';
import LogoAcCorp1 from '../../components/Logos/ACCorp1';

export default function LoadingPage(){

	const { t } = useTranslation();

    return (
		<DefaultLoadingPage
			text={t("main.loading")}
			icon={<IconLoading/>}
			logo={<LogoAcCorp1/>}
		/>
    )
}