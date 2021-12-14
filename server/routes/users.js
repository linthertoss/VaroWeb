import express from "express";
import { getTokenNew } from "./../services/imdb";

let router = express.Router();

router.get("/token/new", async (req, res) => {
  try {
    const token = await getTokenNew();

    res.json(token);
  } catch (error) {
    res.json(error);
  }
});

export default router;
