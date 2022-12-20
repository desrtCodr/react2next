import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../pages/api/api';
import Table from './Table';

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

export default class Popular extends React.Component {
  //constructor: lifecyle method good for setting initial state and props, binding functions to correct context
  state = {
    selectedLanguage: 'All',
    repos: null,
    error: null,
  };
  //compponentDidMount: invoked once the component mounts to the DOM. Good for AJAX requests, setting up listeneres
  componentDidMount() {
    //fetch Repos with selected language, but do that with the updateLanguage method
    this.updateLanguage(this.state.selectedLanguage);
  }
  //componenetDidUpdate: invoked immediately after updating occurs. Good for AJAX requests based on changing props or DOM operatations
  componentDidUpdate() {}
  //componentWillUnmount: called right before a component is unmounnted. good for cleaning up listeners.
  componentWillUnmount() {}
  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null,
    });
    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn('Error fetching repos: ', error);

        this.setState({
          error: `There was an error fetching the repositories`,
        });
      });
  };
  //render: lifecyle method describing (with JSX) the DOM node you want to render.
  //This is a pure function - should only examine state and props and return the description of the UI
  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <main className='stack main-stack animate-in'>
        <div className='split'>
          <h1>Popular</h1>
          <LanguagesNav
            selected={selectedLanguage}
            onUpdateLanguage={this.updateLanguage}
          />
        </div>

        {error && <p className='text-center error'>{error}</p>}

        {repos && <Table repos={repos} />}
      </main>
    );
  }
}
