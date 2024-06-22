import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../api';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const getMovies = async () => {
      if (!query) return;
      try {
        const data = await fetchMovies(`/search/movie?query=${query}`, true);
        setMovies(data.results);
      } catch (error) {
        console.error('Помилка при отриманні фільмів:', error);
      }
    };

    getMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newQuery = form.elements.query.value.trim();
    if (newQuery) {
      setSearchParams({ query: newQuery });
    }
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Пошук</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;

