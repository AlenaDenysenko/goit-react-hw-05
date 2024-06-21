import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../api';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Помилка при отриманні рецензій:', error);
      }
    };

    getReviews();
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



