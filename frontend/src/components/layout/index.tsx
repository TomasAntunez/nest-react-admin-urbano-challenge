import { useState } from 'react';
import { Menu, X } from 'react-feather';
import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

export function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Sidebar
        className={showSidebar ? 'show' : ''}
        onNavItemClick={() => setShowSidebar(false)}
      />

      <Outlet />

      <button
        className={`fixed bottom-5 border shadow-md bg-white p-3 rounded-full transition-all focus:outline-none lg:hidden ${
          showSidebar ? 'right-5' : 'left-5'
        }`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={30} /> : <Menu size={30} />}
      </button>
    </>
  );
}
