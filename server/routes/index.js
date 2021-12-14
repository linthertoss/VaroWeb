import express from "express";

import test from "./test";
import movies from "./movies";
import users from "./users";

let router = express.Router();

router.use("/test", test);
router.use("/movies", movies);
router.use("/users", users);

export default router;
