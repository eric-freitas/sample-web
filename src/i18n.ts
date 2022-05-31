import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
		},
		fallbackLng: 'en',
		debug: false,
		lng: "pt-BR",
		react: {
			useSuspense: false
		},
		interpolation: {
			escapeValue: false, 
		},
	});

export default i18n;