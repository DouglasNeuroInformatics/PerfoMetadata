import { LanguageToggle, ThemeToggle } from '@douglasneuroinformatics/ui';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="bg-white/90 dark:bg-slate-800/90 z-50 fixed w-full">
      <div className="container font-medium flex p-3 justify-between items-center">
        <span className="hidden sm:block">Perfocentre Metadata</span>
        <div className="flex items-center gap-6 flex-grow justify-between sm:justify-end">
          <nav className="flex gap-3">
            <NavLink className="hover:opacity-80" to="/">
              Home
            </NavLink>
            <NavLink className="hover:opacity-80" to="/data">
              Data
            </NavLink>
          </nav>
          <div className="flex gap-3">
            <ThemeToggle />
            <LanguageToggle options={['en', 'fr']} />
          </div>
        </div>
      </div>
    </div>
  );
};
