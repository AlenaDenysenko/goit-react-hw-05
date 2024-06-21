import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc3ZjFiNGRiOTk4ZGViZThkODFhODczZjVmZTUzMiIsInN1YiI6IjY2NzMxZmQ3NDdmY2VlODA1NGVjNTEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DkFzPW3MkRrLPxS59ieo68IDizJGQf7PFJILduLwHlo',
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Помилка при отриманні оглядів:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Рецензії</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає доступних оглядів для цього фільму.</p>
      )}
    </div>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieReviews;
