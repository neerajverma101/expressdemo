const express = require("express");

const router = express.Router();

const routeController = require("../controllers/app.js");

const checkAuth = require("../auth");

router.get(
  "/popular",
  checkAuth.authenticateToken,
  routeController.getPopularMovies
);

router.get("/search-movies/:keyword", routeController.searchMovies);

router.get("/search-weather/:keyword", routeController.searchWeather);

router.get("/search-repos/:keyword", routeController.searchRepos);

router.get("/apis", (req, res, next) =>
  res.json({ apis: Object.keys(routeController) })
);

router.get("/reqres/:keyword", routeController.getReqRes);

router.post("/token", routeController.getAccessToken);

module.exports = router;
