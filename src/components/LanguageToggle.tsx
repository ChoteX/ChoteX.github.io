import { useLanguage } from '../LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label={language === 'ka' ? 'ენის არჩევა' : 'Choose language'}
      className="flex shrink-0 items-center rounded-md border border-ink/25 p-0.5">
      {(['en', 'ka'] as const).map((locale) => (
        <button key={locale} type="button" lang={locale}
          aria-label={locale === 'en' ? 'English' : 'ქართული'}
          aria-pressed={language === locale}
          onClick={() => setLanguage(locale)}
          className={`min-h-10 min-w-10 rounded px-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${language === locale ? 'bg-accent text-deep' : 'text-ink/80 hover:bg-surface-hover hover:text-ink-strong'}`}>
          {locale === 'en' ? 'EN' : 'ქარ'}
        </button>
      ))}
    </div>
  );
}
