const express = require("express");
const router = express.Router();
const routeController = require("../controllers/index.js");
const checkAuth = require("../auth");
const validate = require("../controllers/validate");

router.get(
  "/popular/movies",
  checkAuth.authenticateToken,
  routeController.getPopularMovies
);

router.get("/search/movies/:keyword", routeController.searchMovies);

router.get("/search/weather/:keyword", routeController.searchWeather);

router.get("/search/repos/:keyword", routeController.searchRepos);

router.get("/services", (req, res) =>
  res.json({ services: Object.keys(routeController) })
);

router.post("/token", routeController.getAccessToken);

router.get("/users/", routeController.getUsers);

router.get("/posts/", routeController.getPosts);

router.get("/users/:id", routeController.getUsers);

router.get("/posts/:id", routeController.getPosts);

router.post("/users", validate.users, routeController.addUser);

router.post("/posts", validate.posts, routeController.addPost);

router.patch("/users/:id", routeController.updateUser);

router.patch("/posts/:id", routeController.updatePost);

router.delete("/users/:id", routeController.deleteUser);

router.delete("/posts/:id", routeController.deletePost);

router.get("/user/:id/posts", routeController.getUserPosts);

router.get("/user-posts/:id", routeController.getUserPosts);

router.get("/related/:keyword", routeController.getRelated);

router.get("/movie-details/:keyword", routeController.getMovieDetails);

module.exports = router;
