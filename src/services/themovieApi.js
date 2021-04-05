import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3`;
const API_KEY = `d407875648143dbc537f3d16fab2b882&page=1`;

const getTrendingMovie = () => {
  return axios
    .get(`/trending/movie/day?api_key=${API_KEY}`)
    .then(response => {
      return response.data.results;
    })
    .catch(error => console.log(error));
};

const getMovieDetails = movie_id => {
  return axios
    .get(`/movie/${movie_id}?api_key=${API_KEY}`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

const getMovieCast = movie_id => {
  return axios
    .get(`/movie/${movie_id}/credits?api_key=${API_KEY}`)
    .then(response => {
      return response.data.cast;
    })
    .catch(error => console.log(error));
};

const getMovieRewiews = movie_id => {
  return axios
    .get(`/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-U`)
    .then(response => {
      return response.data.results;
    })
    .catch(error => console.log(error));
};

export default {
  getTrendingMovie,
  getMovieDetails,
  getMovieCast,
  getMovieRewiews,
};
