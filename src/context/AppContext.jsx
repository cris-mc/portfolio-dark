import React, { createContext, useContext, useState } from "react";
import translations from '../i18n';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [lang, setLang] = useState("es"); // "es" or "en"

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};


export const useTranslation = () => {
  const { lang } = useAppContext();
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return '';
    }
    return value;
  };
  return { t, lang };
};
