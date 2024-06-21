import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = React.lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = React.lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const apiKey = '7c77f1b4db998debe8d81a873f5fe532';

const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    throw error;
  }
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<HomePage fetchMovies={fetchMovies} />} 
          />
          <Route
            path="/movies"
            element={<MoviesPage fetchMovies={fetchMovies} />}
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;


