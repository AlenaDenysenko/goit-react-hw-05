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
        console.error('Помилка при отриманні рецензій:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Рецензії</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieReviews;


