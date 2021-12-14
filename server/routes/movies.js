import express from "express";

import { favoriteMovie, getCasterByMovieId, getFavoriteMovies, getNowPlayingMovies } from "../services/imdb";

let router = express.Router();

router.get("/nowPlaying", async (req, res) => {
  const { sort_by, keyword } = req.query;

  try {
    let { results: movies = [] } = await getNowPlayingMovies();

    if (sort_by) {
      const [key, value] = sort_by.split(".");
      switch (key) {
        case "rating":
          movies.sort((a, b) => (value === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average));
          break;
        case "release":
          movies.sort((a, b) =>
            value === "asc"
              ? new Date(a.release_date) - new Date(b.release_date)
              : new Date(b.release_date) - new Date(a.release_date)
          );
          break;
        case "title":
          movies.sort((a, b) => (value === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
          break;

        default:
          break;
      }
    }
    if (keyword) {
      movies = movies.filter((movie) => movie.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    }

    return res.json({ movies });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:movieId/casters", async (req, res) => {
  const { movieId } = req.params;
  try {
    const result = await getCasterByMovieId(movieId);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
