import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId, true);
        setReviews(data);
      } catch (error) {
        console.error('Помилка при отриманні рецензій:', error);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>Рецензії відсутні</p>;
  }

  return (
    <div className={styles.reviewsList}>
      <h2>Рецензії</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  useApi1: PropTypes.bool,
};

export default MovieReviews;




