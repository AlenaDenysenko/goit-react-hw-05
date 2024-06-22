import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { fetchMovieDetails } from '../../api';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLocation = location.state?.from || '/';

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId, true);
        setMovie(data);
      } catch (error) {
        console.error('Помилка при отриманні деталей фільму:', error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLocation);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Назад
      </button>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Додаткова інформація</h3>
        <ul>
          <li>
            <Link to={`cast`} state={{ from: backLocation }} className={styles.link}>
              Акторський склад
            </Link>
          </li>
          <li>
            <Link to={`reviews`} state={{ from: backLocation }} className={styles.link}>
              Рецензії
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;



