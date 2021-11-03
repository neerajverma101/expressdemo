const express = require("express");

const router = express.Router();

const routeController = require("../controllers/app.js");

router.get("/popular", routeController.getPopularMovies);

router.get("/search-movies/:keyword", routeController.searchMovies);

router.get("/search-weather/:keyword", routeController.searchWeather);

router.get("/search-repos/:keyword", routeController.searchRepos);

router.get("/apis", (req, res, next) =>
  res.json({ apis: Object.keys(routeController) })
);

router.get("/reqres/:keyword", routeController.getReqRes);

module.exports = router;
