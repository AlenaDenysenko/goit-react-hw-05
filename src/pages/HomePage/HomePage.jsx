import { useEffect, useState } from 'react';
import { fetchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies('/movie/popular');
        setMovies(data.results);
      } catch (error) {
        console.error('Помилка при отриманні фільмів:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Популярні фільми</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

