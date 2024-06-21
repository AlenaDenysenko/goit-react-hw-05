import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false`,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc3ZjFiNGRiOTk4ZGViZThkODFhODczZjVmZTUzMiIsInN1YiI6IjY2NzMxZmQ3NDdmY2VlODA1NGVjNTEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DkFzPW3MkRrLPxS59ieo68IDizJGQf7PFJILduLwHlo',
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Помилка при пошуку фільмів:', error);
    }
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть назву фільму"
        />
        <button type="submit">Пошук</button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
