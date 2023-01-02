import React from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import ThemeContext from '../contexts/theme';

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light';
    });
  };
  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}
