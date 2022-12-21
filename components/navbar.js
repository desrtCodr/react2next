import Link from 'next/link';
import PropTypes from 'prop-types';
import { sunIcon, moonIcon } from './icons';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <nav className='split'>
      <Link
        href='/'
        // className={({ isActive }) =>
        //   'nav-link' + (isActive ? ' active' : '')
        // }
      >
        Github Battle
      </Link>
      <ul className='row'>
        <li>
          <Link
            href='/'
            // className={({ isActive }) =>
            //   'nav-link' + (isActive ? ' active' : '')
            // }
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            href='/battle'
            // className={({ isActive }) =>
            //   'nav-link' + (isActive ? ' active' : '')
            // }
          >
            Battle
          </Link>
        </li>
        <li>
          <button
            className='btn secondary icon'
            onClick={toggleTheme}
          >
            {theme === 'light' ? sunIcon : moonIcon}
          </button>
        </li>
      </ul>
    </nav>
  );
}

/*
Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
*/
