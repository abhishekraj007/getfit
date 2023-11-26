import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext({
  lang: 'en',
  updateLanguage: (_: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLan] = useState('en');

  const updateLanguage = async (lan: string) => {
    setLan(lan);

    try {
      AsyncStorage.setItem('lang', lan);
    } catch {}
  };

  useEffect(() => {
    const checkLang = async () => {
      await AsyncStorage.getItem('lang').then((value) => {
        if (value) {
          setLan(value);
        }
      });
    };

    checkLang();
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, updateLanguage }}>{children}</LanguageContext.Provider>
  );
};
