import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovieCast } from '../../api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const data = await fetchMovieCast(movieId, true);
        setCast(data);
      } catch (error) {
        console.error('Помилка при отриманні акторського складу:', error);
      }
    };

    getMovieCast();
  }, [movieId]);

  return (
    <div className={styles.castList}>
      <h2>Акторський склад</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p>{actor.name}</p>
            <p>Роль: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  useApi1: PropTypes.bool,
};

export default MovieCast;


