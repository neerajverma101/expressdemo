const services = require("../services");
const { generateAccessToken } = require("../middleware/auth");
const { validationResult } = require("express-validator");

const responseHandler = (res, err, data) => {
  if (err) {
    res.json({ error: true, message: err });
  } else {
    res.json(data);
  }
};

const getPopularMovies = (req, res) => {
  services.getPopularMovies(responseHandler.bind(this, res));
};

const searchMovies = (req, res) => {
  const { keyword } = req.params;
  services.searchMovies(keyword, responseHandler.bind(this, res));
};

const searchWeather = (req, res) => {
  const { keyword } = req.params;
  services.searchWeather(keyword, responseHandler.bind(this, res));
};

const searchRepos = (req, res) => {
  const { keyword } = req.params;
  services.searchRepos(keyword, responseHandler.bind(this, res));
};

const getUsers = (req, res) => {
  const { id } = req.params;
  services.getUsers(id, responseHandler.bind(this, res));
};

const getPosts = (req, res) => {
  const { id } = req.params;
  services.getPosts(id, responseHandler.bind(this, res));
};

const getAccessToken = (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    responseHandler.bind(this, res)("invalid username");
  } else {
    const token = generateAccessToken({ username: req.body.username });
    responseHandler.bind(this, res)(null, token);
  }
};

const addUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    const { body } = req;
    services.addUser(body, responseHandler.bind(this, res));
  }

};

const addPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });

  } else {
    const { body } = req;
    services.addPost(body, responseHandler.bind(this, res));
  }
};

const updateUser = (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  services.updateUser(id, body, responseHandler.bind(this, res));
};

const updatePost = (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  services.updatePost(id, body, responseHandler.bind(this, res));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  services.deleteUser(id, responseHandler.bind(this, res));
};

const deletePost = (req, res) => {
  const { id } = req.params;
  services.deletePost(id, responseHandler.bind(this, res));
};

const getUserPosts = (req, res) => {
  const { id } = req.params;
  services.getUserPosts(id, responseHandler.bind(this, res));
};

const getRelated = (req, res) => {
  const { keyword } = req.params;
  services.getRelated(keyword, responseHandler.bind(this, res));
};

const getMovieDetails = (req, res) => {
  const { keyword } = req.params;
  services.getMovieDetails(keyword, responseHandler.bind(this, res));
};

module.exports = {
  getPopularMovies,
  searchMovies,
  searchWeather,
  searchRepos,
  getAccessToken,
  getUsers,
  getPosts,
  addUser,
  addPost,
  updatePost,
  updateUser,
  deleteUser,
  deletePost,
  getUserPosts,
  getRelated,
  getMovieDetails,
};
