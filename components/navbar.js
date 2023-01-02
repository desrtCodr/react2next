import Link from 'next/link';
import { sunIcon, moonIcon } from './icons';
import { useRouter } from 'next/router';

export default function Navbar({ theme, toggleTheme }) {
  const router = useRouter();
  return (
    <nav className='split'>
      <Link
        href='/'
        className={
          router.pathname == '/' ? 'nav-link active' : 'nav-link'
        }
      >
        Github Battle
      </Link>
      <ul className='row'>
        <li>
          <Link
            href='/'
            className={
              router.pathname == '/' ? 'nav-link active' : 'nav-link'
            }
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            href='/battle'
            className={
              router.pathname == '/battle'
                ? 'nav-link active'
                : 'nav-link'
            }
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
