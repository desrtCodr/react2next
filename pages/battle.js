import React from 'react';
import PropTypes from 'prop-types';
import { close } from '../components/icons';
import Link from 'next/link';

function Instuctions() {
  return (
    <section className='instructions-container'>
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
}
function PlayerInput({ label, onSubmit }) {
  const [username, setUsername] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <form className='card' onSubmit={handleSubmit}>
      <label htmlFor='username' className='player-label'>
        {label}
      </label>
      <div className='input-row'>
        <input
          type='text'
          id='username'
          placeholder='github username'
          autoComplete='off'
          value={username}
          onChange={handleChange}
        />
        <button
          className='btn link'
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function PlayerPreview({ username, onReset, label }) {
  return (
    <article className='card'>
      <h3 className='player-label'>{label}</h3>
      <div className='split'>
        <div className='row gap-md'>
          <img
            width={32}
            height={32}
            className='avatar'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`}>{username}</a>
        </div>
        <button onClick={onReset} className='btn secondary icon'>
          {close}
        </button>
      </div>
    </article>
  );
}
PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);
  const disabled = !playerOne || !playerTwo;

  const handleSubmit = (id, player) => {
    id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player);
  };

  const handleReset = (id) => {
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null);
  };
  return (
    <main className='stack main-stack animate-in'>
      <div className='split'>
        <h1>Players</h1>
        <Link
          href={{
            pathname: '/results',
            query: `playerOne=${playerOne}&playerTwo=${playerTwo}`,
          }}
          className={`btn primary ${disabled ? 'disabled' : ''}`}
        >
          Battle
        </Link>
      </div>
      <section className='grid'>
        {playerOne === null ? (
          <PlayerInput
            label='Player One'
            onSubmit={(player) => handleSubmit('playerOne', player)}
          />
        ) : (
          <PlayerPreview
            label='Player One'
            username={playerOne}
            onReset={() => handleReset('playerOne')}
          />
        )}
        {playerTwo === null ? (
          <PlayerInput
            label='Player Two'
            onSubmit={(player) => handleSubmit('playerTwo', player)}
          />
        ) : (
          <PlayerPreview
            label='Player Two'
            username={playerTwo}
            onReset={() => handleReset('playerTwo')}
          />
        )}
      </section>
      <Instuctions />
    </main>
  );
}
