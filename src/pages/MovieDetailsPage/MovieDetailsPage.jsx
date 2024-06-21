import { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useParams, useRouteMatch, Route, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: 'Bearer 7c77f1b4db998debe8d81a873f5fe532',
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      history.push(location.state.from);
    } else {
      history.push('/movies');
    }
  };

  return (
    <div className={styles.container}>
      {movie && (
        <>
          <button onClick={handleGoBack} className={styles.goBackButton}>
            Go back
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
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to={`${url}/cast`} className={styles.link}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`${url}/reviews`} className={styles.link}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path={`${path}/cast`} component={MovieCast} />
            <Route path={`${path}/reviews`} component={MovieReviews} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
