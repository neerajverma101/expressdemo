const services = require("../services/app");

const { generateAccessToken } = require("../auth");

const handleResponse = (res, err, data) => {
  if (err) return res.json({ error: true, message: err });
  res.json(data);
};

const getPopularMovies = (req, res, next) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=198ec25c0244052ed80ef2ceecb77252&language=en-US&page=1`;
  services.getPopularMovies(url, handleResponse.bind(this, res));
};

const searchMovies = (req, res, next) => {
  const url = "https://www.omdbapi.com/";
  const { keyword } = req.params;
  services.searchMovies(url, keyword, handleResponse.bind(this, res));
};

const searchWeather = (req, res, next) => {
  const url = "https://api.weatherapi.com/v1/current.json";
  const { keyword } = req.params;
  services.searchWeather(url, keyword, handleResponse.bind(this, res));
};

const searchRepos = (req, res, next) => {
  const url = "https://api.github.com/orgs/";
  const { keyword } = req.params;
  services.searchRepos(url, keyword, handleResponse.bind(this, res));
};

const getReqRes = (req, res, next) => {
  const url = "https://reqres.in/api/";
  const { keyword } = req.params;
  services.getReqRes(url + keyword, {}, handleResponse.bind(this, res));
};

const getAccessToken = (req, res, next) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
};

module.exports = {
  getPopularMovies,
  searchMovies,
  searchWeather,
  searchRepos,
  getReqRes,
  getAccessToken,
};
