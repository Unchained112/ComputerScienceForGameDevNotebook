export type Lang = 'zh' | 'en';

export interface I18nText {
  zh: string;
  en: string;
}

const STORAGE_KEY = 'csnote-lang';

export function getStoredLang(): Lang {
  if (typeof localStorage === 'undefined') return 'zh';
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'en' ? 'en' : 'zh';
}

export function setStoredLang(lang: Lang): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, lang);
}

export function t(text: I18nText, lang: Lang): string {
  return text[lang];
}

export function isLang(v: unknown): v is Lang {
  return v === 'zh' || v === 'en';
}
