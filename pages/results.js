import * as React from 'react';
import { battle } from '../pages/api/api';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import withSearchParams from '../components/withSearchParams';
import Link from 'next/link';
import ThemeContext from '../contexts/theme';

function Card({ profile }) {
  const { theme } = React.useContext(ThemeContext);
  const {
    login,
    avatar_url,
    html_url,
    followers,
    following,
    public_repos,
    location,
    company,
  } = profile;

  return (
    <div className={`card bg-${theme}`}>
      <header className='split'>
        <div>
          <h4>
            <a href={html_url}>{login}</a>
          </h4>
          <p>{location || 'unknown'}</p>
        </div>
        <img
          className='avatar large'
          src={avatar_url}
          alt={`Avatar for ${login}`}
        />
      </header>
      <ul className='stack'>
        <li className='split'>
          <span>Name:</span>
          <span>{login || 'n/a'}</span>
        </li>
        <li className='split'>
          <span>Company:</span>
          <span>{company || 'n/a'}</span>
        </li>
        <li className='split'>
          <span>Follwers:</span>
          <span>{followers}</span>
        </li>
        <li className='split'>
          <span>Following:</span>
          <span>{following}</span>
        </li>
        <li className='split'>
          <span>Repositories:</span>
          <span>{public_repos}</span>
        </li>
      </ul>
    </div>
  );
}

Card.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number,
    location: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
};
function resultsReducer(state, action) {
  if (action.type === 'success') {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  } else if (action.type === 'error') {
    return {
      error: action.message,
    };
  } else {
    throw new Error('This action type is not supported');
  }
}

function Results({ router }) {
  const [state, dispatch] = React.useReducer(resultsReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });
  const { playerOne, playerTwo } = router;
  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) => {
        dispatch({
          type: 'success',
          winner: players[0],
          loser: players[1],
        });
      })
      .catch(({ message }) => {
        dispatch({
          type: 'error',
          message,
        });
      });
  }, [playerOne, playerTwo]);
  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading />;
  }

  if (error) {
    return <p className='text-center error'>{error}</p>;
  }

  return (
    <main className='animate-in stack main-stack'>
      <div className='split'>
        <h1>Results</h1>
        <Link href='/battle' className='btn secondary'>
          Reset
        </Link>
      </div>
      <section className='grid'>
        <article>
          <Card profile={winner.profile} />
          <p className='results'>
            <span>
              {winner.score === loser.score ? 'Tie' : 'Winner'}{' '}
              {winner.score.toLocaleString()}
            </span>
            {winner.score !== loser.score && (
              <img
                width={80}
                src='https://ui.dev/images/certificate.svg'
                alt='certificate'
              />
            )}
          </p>
        </article>
        <article>
          <Card profile={loser.profile} />
          <p className='results'>
            <span>
              {winner.score === loser.score ? 'Tie' : 'Loser'}{' '}
              {loser.score.toLocaleString()}
            </span>
          </p>
        </article>
      </section>
    </main>
  );
}

export default withSearchParams(Results);
