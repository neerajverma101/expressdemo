const axios = require("axios");

const getReqRes = (url, { method, data, params }, callback) => {
  const options = { url, method: method || "get" };
  if (data) {
    options = { ...options, data };
  }
  if (params) {
    options = { ...options, params };
  }
  axios(options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err.message);
    });
};

const getPopularMovies = (url, callback) => {
  axios
    .get(url)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err.message);
    });
};

const searchMovies = (url, keyword, callback) => {
  let options = {
    method: "GET",
    url,
    params: { s: keyword, apikey: "8f303df" },
  };
  axios
    .request(options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err.message);
    });
};

const searchWeather = (url, keyword, callback) => {
  const options = {
    params: { key: "9f117934360c465785793737210311", q: keyword },
  };
  axios
    .get(url, options)
    .then((response) => callback(null, response.data))
    .catch((err) => callback(err.message));
};

const searchRepos = (url, keyword, callback) => {
  axios
    .get(url + keyword + "/repos")
    .then((response) => callback(null, response.data))
    .catch((err) => callback(err.message));
};

module.exports = {
  getPopularMovies,
  searchMovies,
  searchWeather,
  searchRepos,
  getReqRes,
};
