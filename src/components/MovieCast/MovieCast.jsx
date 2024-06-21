import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc3ZjFiNGRiOTk4ZGViZThkODFhODczZjVmZTUzMiIsInN1YiI6IjY2NzMxZmQ3NDdmY2VlODA1NGVjNTEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DkFzPW3MkRrLPxS59ieo68IDizJGQf7PFJILduLwHlo
',
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Помилка при отриманні акторського складу:', error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <h3>Акторський склад</h3>
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
