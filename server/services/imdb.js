import axios from "axios";

const imdbHost = "https://api.themoviedb.org";
const nowPlayingPath = "/3/movie/now_playing";

const apiKey = "b8359a48e865c6dff15dbc8a38c60bd1"; // Check the email for the API key

const getApiUrl = ({ path, queryParamString }) =>
  `${imdbHost}${path}?api_key=${apiKey}${queryParamString ? "&" + queryParamString : ""}`;

const makeRequest = ({ url, method = "get", data = {} }) =>
  new Promise((resolve, reject) => {
    const option = {
      url,
      method,
      headers: {
        "content-type": "application/json",
      },
    };
    if (method.toLowerCase() !== "get") {
      option.data = data;
    }
    axios(option)
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });

export const getNowPlayingMovies = () =>
  makeRequest({ url: getApiUrl({ path: nowPlayingPath, queryParamString: `sort_by=vote_average.desc` }) });

export const getCasterByMovieId = (movieId) => makeRequest({ url: getApiUrl({ path: `/3/movie/${movieId}/credits` }) });

export const getTokenNew = () => makeRequest({ url: getApiUrl({ path: `/3/authentication/guest_session/new` }) });
