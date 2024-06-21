import { useEffect, useState, lazy, Suspense, useLocation, useHistory } from 'react'; // Додайте useLocation та useHistory
import { useParams, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { pathname } = useLocation(); // Використовуйте useLocation для отримання поточного шляху
  const history = useHistory(); // Використовуйте useHistory для навігації назад
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

  

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
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
            <Link to={`${pathname}/cast`} className={styles.link}>
              Акторський склад
            </Link>
          </li>
          <li>
            <Link to={`${pathname}/reviews`} className={styles.link}>
              Рецензії
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={`${pathname}/cast`} element={<MovieCast />} />
            <Route path={`${pathname}/reviews`} element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
