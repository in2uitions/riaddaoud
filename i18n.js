import Link from 'next/link'
import React from 'react';
import ReactDOM from "react-dom"
import i18n from "i18next"
import {useTranslation,initReactI18next} from "react-i18next"

import translationEn from "./locales/en.json"
import translationAr from "./locales/ar.json"
const resources ={
    en:{
        translation:translationEn
    },
    ar:{
        translation:translationAr
    }
};
i18n
    .use(initReactI18next)//passes i18n down to react-i18next
    .init({
        resources,
        lng:'en',
        fallbackLng:'en',
        KeySeparator:false,
        interpolation:{
            escapeValue:false
        }
    });
export default i18n;