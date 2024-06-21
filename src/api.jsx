import axios from 'axios';

const apiKey1 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc3ZjFiNGRiOTk4ZGViZThkODFhODczZjVmZTUzMiIsInN1YiI6IjY2NzMxZmQ3NDdmY2VlODA1NGVjNTEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DkFzPW3MkRrLPxS59ieo68IDizJGQf7PFJILduLwHlo';
const apiKey2 = '7c77f1b4db998debe8d81a873f5fe532';

const api1 = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiKey1}`,
  },
});

const api2 = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiKey2}`,
  },
});

export const fetchMovies = async (url, useApi1 = true) => {
  try {
    const response = await (useApi1 ? api1 : api2).get(url);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId, useApi1 = true) => {
  try {
    const response = await (useApi1 ? api1 : api2).get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні деталей фільму:', error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId, useApi1 = true) => {
  try {
    const response = await (useApi1 ? api1 : api2).get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Помилка при отриманні акторського складу:', error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId, useApi1 = true) => {
  try {
    const response = await (useApi1 ? api1 : api2).get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Помилка при отриманні рецензій:', error);
    throw error;
  }
};
