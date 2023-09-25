import { LanguageToggle, ThemeToggle } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/90 dark:bg-slate-800/90 z-50 fixed w-full">
      <div className="container font-medium flex py-3 justify-between items-center">
        <span className="hidden sm:block">{t('platformTitle')}</span>
        <div className="flex items-center flex-grow justify-between sm:justify-end">
          <nav className="flex gap-3">
            <NavLink className="hover:opacity-80 p-2" to="/">
              {t('home')}
            </NavLink>
            <NavLink className="hover:opacity-80 p-2" to="/data">
              {t('data')}
            </NavLink>
          </nav>
          <div className="mx-5 h-8 hidden sm:block w-[1px] rounded-md bg-slate-300 dark:bg-slate-700" />
          <div className="flex gap-3">
            <ThemeToggle />
            <LanguageToggle options={['en', 'fr']} />
          </div>
        </div>
      </div>
    </div>
  );
};
