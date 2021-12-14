import express from "express";

import { favoriteMovie, getCasterByMovieId, getNowPlayingMovies } from "../services/imdb";

let router = express.Router();

router.get("/nowPlaying", async (req, res) => {
  let nowPlaying;
  await getNowPlayingMovies()
    .then((response) => {
      nowPlaying = response;
    })
    .catch((error) => {
      console.log(error);
      nowPlaying = error;
    });
  return res.json(nowPlaying);
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

router.get("/favorite", async (req, res) => {
  const { media_id, favorite } = req.body;
  const { session_id } = req.headers;
  try {
    const result = await favoriteMovie({ media_id, favorite, session_id });

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
