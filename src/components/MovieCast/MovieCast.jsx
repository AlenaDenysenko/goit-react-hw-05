import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCast } from '../../api';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Помилка при отриманні акторського складу:', error);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <div>
      <h2>Акторський склад</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieCast;

