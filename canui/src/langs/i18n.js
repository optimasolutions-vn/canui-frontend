import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";


i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
			whitelist: ['cn', 'en', 'vn', 'kr', 'jp'],
			nonExplicitWhitelist: true,
			load: 'languageOnly',
			fallbackLng: 'en'
		/*fallbackLng: "en",
		debug: false,
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		}*/
	});
	i18n.changeLanguage('en');

export default i18n;
