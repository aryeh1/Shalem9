import React from 'react';

function Navbar({activePage, handleMenuClick}) {
  return (
    <nav>
      <ul className="menu">
        <li className={activePage === 'fetcher' ? 'active' : ''} onClick={() => handleMenuClick('fetcher')}>
          Fetcher
        </li>
        <li className={activePage === 'history' ? 'active' : ''} onClick={() => handleMenuClick('history')}>
          History
        </li>
        <li className={activePage === 'page1' ? 'active' : ''} onClick={() => handleMenuClick('page1')}>
          Page 1
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
