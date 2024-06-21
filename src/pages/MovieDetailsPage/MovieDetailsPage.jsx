import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc3ZjFiNGRiOTk4ZGViZThkODFhODczZjVmZTUzMiIsInN1YiI6IjY2NzMxZmQ3NDdmY2VlODA1NGVjNTEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DkFzPW3MkRrLPxS59ieo68IDizJGQf7PFJILduLwHlo',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Помилка при отриманні деталей фільму:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
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
            <Link to={`/movies/${movieId}/cast`} className={styles.link}>
              Акторський склад
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} className={styles.link}>
              Рецензії
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="cast" element={<MovieCast movieId={movieId} />} />
            <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

