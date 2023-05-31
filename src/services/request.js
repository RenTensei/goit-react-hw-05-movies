import axios from 'axios';
import { API_KEY, BASE_URL } from './constants';

export async function getTrendingMovies() {
  try {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieInfo(movie_id) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieReviews(movie_id) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieCast(movie_id) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMoviesByQuery(query) {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
