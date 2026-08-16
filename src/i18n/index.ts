import en from './en.json';
import es from './es.json';

const translations: Record<string, Record<string, string>> = { en, es };

export const defaultLang = 'en' as const;
export const languages = ['en', 'es'] as const;

export type Lang = (typeof languages)[number];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Lang)) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
  };
}

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const isDefaultLang = !currentPath.startsWith('/es');

  if (targetLang === 'es' && isDefaultLang) {
    return `/es${currentPath === '/' ? '' : currentPath}`;
  }

  if (targetLang === 'en' && !isDefaultLang) {
    return currentPath.replace(/^\/es/, '') || '/';
  }

  return currentPath;
}

export function getWritingPath(lang: Lang): string {
  return lang === 'es' ? '/es/writing' : '/writing';
}

export function getArticlePath(slug: string, lang: Lang): string {
  return lang === 'es' ? `/es/writing/${slug}` : `/writing/${slug}`;
}
