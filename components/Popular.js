import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../pages/api/api';
import Table from './Table';
import Loading from './Loading';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = [
    'All',
    'Javascript',
    'Ruby',
    'Java',
    'CSS',
    'Python',
  ];

  return (
    <select
      onChange={(e) => {
        onUpdateLanguage(e.target.value);
      }}
      selected={selected}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}
LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};
function popularReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error('This action type is not supported.');
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState('All');
  const [state, dispatch] = React.useReducer(popularReducer, {
    repos: null,
    error: null,
  });
  const repoRef = React.useRef([]);

  React.useEffect(() => {
    if (repoRef.current.includes(selectedLanguage) === false) {
      repoRef.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then((repos) => {
          console.log(repos);
          dispatch({
            type: 'success',
            selectedLanguage,
            repos,
          });
        })
        .catch((error) => {
          dispatch({
            type: 'error',
            error,
          });
        });
    }
  }, [repoRef, selectedLanguage]);

  const isLoading = () =>
    !state[selectedLanguage] && state.error === null;

  return (
    <main className='stack main-stack animate-in'>
      <div className='split'>
        <h1>Popular</h1>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={setSelectedLanguage}
        />
      </div>
      {isLoading() && <Loading text='Fetching Repos' />}
      {state.error && (
        <p className='text-center error'>{state.error}</p>
      )}

      {state[selectedLanguage] && (
        <Table repos={state[selectedLanguage]} />
      )}
    </main>
  );
}
