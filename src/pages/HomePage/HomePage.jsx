import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          {
            headers: {
              Authorization: 'rer 7c77f1b4db998debe8d81a873f5fe532',
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Помилка при отриманні списку популярних фільмів:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Популярні фільми</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
