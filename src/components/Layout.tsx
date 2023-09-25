import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="container min-h-screen pt-16 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
