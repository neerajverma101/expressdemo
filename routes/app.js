const express = require("express");

const router = express.Router();

const routeController = require("../controllers/app.js");

const checkAuth = require("../auth");

router.get(
  "/popular-movies",
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

router.get("/crud/:resource", routeController.getCrudResourceData);

router.get("/crud/:resource/:id", routeController.getCrudResourceData);

router.post("/crud/:resource", routeController.addCrudResourceData);

router.patch("/crud/:resource/:id", routeController.updateCrudResourceData);

router.delete("/crud/:resource/:id", routeController.deleteCrudResourceData);

router.get("/posts/", routeController.getPosts);

router.get("/posts/:id", routeController.getPosts);

router.get("/error", routeController.handleError);

module.exports = router;
