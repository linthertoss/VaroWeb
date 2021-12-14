import https from "https";

const imdbHost = "https://api.themoviedb.org";
const nowPlayingPath = "/3/movie/now_playing";

const apiKey = "b8359a48e865c6dff15dbc8a38c60bd1"; // Check the email for the API key

const getApiUrl = ({ path, queryParamString }) =>
  `${imdbHost}${path}?api_key=${apiKey}${queryParamString ? "&" + queryParamString : ""}`;

const makeRequest = (url) =>
  new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      response.setEncoding("utf-8");

      var data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        console.log(data);
        var responseObject = JSON.parse(data);
        resolve(responseObject);
      });
    });
    request.on("error", (error) => {
      reject(error);
    });
  });

export const getNowPlayingMovies = () =>
  makeRequest(getApiUrl({ path: nowPlayingPath, queryParamString: `sort_by=vote_average.desc` }));

export const getCasterByMovieId = (movieId) => makeRequest(getApiUrl({ path: `/3/movie/${movieId}/credits` }));

export const getTokenNew = () => makeRequest(getApiUrl({ path: `/3/authentication/token/new` }));

export const favoriteMovie = ({ session_id, favorite, media_id, media_type = "movie" }) =>
  makeRequest(getApiUrl({ path: `/3/account/favorite`, queryParamString: `session_id=${session_id}` }));

export const getFavoriteMovies = (account_id) =>
  makeRequest(getApiUrl({ path: `/3/account/${account_id}/favorite/movies` }));
