import React, { useState } from 'react';
import { Languages } from '@tamagui/lucide-icons';
import { Button, View, useWindowDimensions } from '@t4/ui/src';
import { useLanguage } from 'app/provider/language';
import { CustomSheet } from './CustomSheet';

const languages = [
  'en',
  'es',
  'de',
  'fr',
  'ja',
  'zh',
  'hi',
  'kn',
  'ru',
  'ta',
  'ur',
  'ar',
  'pt',
  'it',
];

const languagesMap = {
  en: 'English',
  es: 'Español', // Spanish
  de: 'Deutsch', // German
  fr: 'Français', // French
  ja: '日本語', // Japanese
  zh: '中文', // Chinese
  hi: 'हिन्दी', // Hindi
  kn: 'ಕನ್ನಡ', // Kannada
  ru: 'Русский', // Russian
  ta: 'தமிழ்', // Tamil
  ur: 'اردو', // Urdu
  ar: 'العربية', // Arabic
  pt: 'Português', // Portuguese
  it: 'Italiano', // Italian
};

export function LanguageSelect() {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { updateLanguage } = useLanguage();

  return (
    <View>
      <Button
        icon={<Languages size={'$1'} />}
        unstyled
        chromeless
        onPress={() => setOpen(true)}
      ></Button>

      {open && (
        <CustomSheet open={open} onOpenChange={setOpen}>
          {languages.map((lang) => {
            return (
              <Button
                onPress={() => {
                  updateLanguage(lang);
                  setOpen(false);
                }}
                key={lang}
                width={width}
                chromeless
              >
                {languagesMap[lang]}
              </Button>
            );
          })}
        </CustomSheet>
      )}
    </View>
  );
}
