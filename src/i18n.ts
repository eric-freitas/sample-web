import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';


export interface I18nArgs {
	language : string,
	fallbackLanguage: string
}

const i18nStart = (args: I18nArgs) => {
	const { language, fallbackLanguage } = args ?? {};

	i18n
		.use(Backend)
		.use(initReactI18next)
		.init({
			backend: {
				loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
			},
			fallbackLng: fallbackLanguage || 'en',
			debug: false,
			lng: language || "en",
			react: {
				useSuspense: false
			},
			interpolation: {
				escapeValue: false, 
			},
		});
}
export default i18nStart;