import axios from 'axios';

const API_KEY = '7c77f1b4db998debe8d81a873f5fe532';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = () => {
  return axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
};

export const searchMovies = query => {
  return axios.get(`${BASE_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      query,
    },
  });
};

export const fetchMovieDetails = movieId => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
};

export const fetchMovieCredits = movieId => {
  return axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
};

export const fetchMovieReviews = movieId => {
  return axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
};

