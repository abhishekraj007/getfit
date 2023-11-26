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
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  ja: 'Japanese',
  zh: 'Chinese',
  hi: 'Hindi',
  kn: 'Kannada',
  ru: 'Russian',
  ta: 'Tamil',
  ur: 'Urdu',
  ar: 'Arabic',
  pt: 'Portuguese',
  it: 'Italian',
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
        backgroundColor={'red'}
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
