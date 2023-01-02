import React from 'react';
import Navbar from './navbar';
import ThemeContext from '../contexts/theme';

export default function Layout({ children }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div className={theme}>
      <div className='container'>
        <Navbar toggleTheme={toggleTheme} />
        <main>{children}</main>
      </div>
    </div>
  );
}
