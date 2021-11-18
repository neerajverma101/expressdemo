const restClient = require("../restClient");
const UserAgent = require("user-agents");
const async = require("async");
const userAgent = new UserAgent();

const getPopularMovies = (responseHandler) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=198ec25c0244052ed80ef2ceecb77252&language=en-US&page=1`;
  restClient({ url }, responseHandler);
};

const searchMovies = (keyword, responseHandler) => {
  const url = "https://www.omdbapi.com/";
  let options = {
    url,
    params: { s: keyword, apikey: "8f303df" },
  };
  restClient(options, responseHandler);
};

const searchWeather = (keyword, responseHandler) => {
  const url = "https://api.weatherapi.com/v1/current.json";
  const options = {
    url,
    params: { q: keyword, key: "9f117934360c465785793737210311" },
  };
  restClient(options, responseHandler);
};

const searchRepos = (keyword, responseHandler) => {
  const url = "https://api.github.com/orgs/";
  const options = {
    url: url + keyword + "/repos",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": userAgent.toString(),
    },
  };
  restClient(options, responseHandler);
};

const getUsers = (id, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/users/";
  const options = {
    url: id ? url + id : url,
  };
  restClient(options, responseHandler);
};

const getPosts = (id, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/posts/";
  const options = {
    url: id ? url + id : url,
  };
  restClient(options, responseHandler);
};

const addUser = (data, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const options = { url, data, method: "POST" };
  restClient(options, responseHandler);
};

const addPost = (data, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const options = { url, data, method: "POST" };
  restClient(options, responseHandler);
};

const updateUser = (id, data, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/users/" + id;
  const options = { url, data, method: "PATCH" };
  restClient(options, responseHandler);
};

const updatePost = (id, data, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/posts/" + id;
  const options = { url, data, method: "PATCH" };
  restClient(options, responseHandler);
};

const deleteUser = (id, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/users" + id;
  const options = { url, method: "DELETE" };
  restClient(options, responseHandler);
};

const deletePost = (id, responseHandler) => {
  const url = "https://jsonplaceholder.typicode.com/posts" + id;
  const options = { url, method: "DELETE" };
  restClient(options, responseHandler);
};

const getUserPosts = (id, responseHandler) => {
  async.series(
    {
      user: (callback) => {
        getUsers(id, (err, res) => {
          if (err) {
            callback({ err, reason: "user api failed" });
          } else {
            callback(null, res);
          }
        });
      },
      posts: (callback) => {
        const url =
          "https://jsonplaceholder.typicode.com/users/" + id + "/posts";
        restClient({ url }, (err, res) => {
          if (err) {
            callback({ err, reason: "post api failed" });
          } else {
            callback(null, res);
          }
        });
      },
    },
    (err, results) => {
      if (err) {
        responseHandler(err);
      } else {
        const { user, posts } = results;
        const userPosts = {
          name: user.name,
          post: posts.map(({ title, body }) => ({ title, description: body })),
        };
        responseHandler(null, userPosts);
      }
    }
  );
};

const getRelated = (keyword, responseHandler) => {
  async.series(
    {
      movies: (callback) => {
        searchMovies(keyword, (err, res) => {
          if (err) {
            callback({ err, reason: "movies api failed" });
          } else {
            callback(null, res);
          }
        });
      },
      weather: (callback) => {
        searchWeather(keyword, (err, res) => {
          if (err) {
            callback({ err, reason: "weather api failed" });
          } else {
            callback(null, res);
          }
        });
      },
      news: (callback) => {
        const url = `https://newsapi.org/v2/everything?qInTitle=${keyword}&from=${new Date().toLocaleDateString()}&sortBy=publishedAt&pageSize=10&language=en&apiKey=0a23c4803c334d68bca181b3f826b5c2`;
        restClient({ url }, (err, res) => {
          if (err) {
            callback({ err, reason: "news api failed" });
          } else {
            callback(null, res);
          }
        });
      },
    },
    (err, results) => {
      if (err) {
        responseHandler(err);
      } else {
        responseHandler(null, results);
      }
    }
  );
};

const getMovieDetails = (keyword, responseHandler) => {
  async.waterfall(
    [
      (callback) => {
        searchMovies(keyword, (err, res) => {
          if (err) {
            callback({ err, reason: "search movie api failed" });
          } else {
            const movies = res && res.Search ? res.Search : null;
            callback(null, movies);
          }
        });
      },
      (movies, callback) => {
        const movie = Array.isArray(movies) && movies.length ? movies[0] : null;
        if (!(movie && movie.imdbID)) {
          callback({ error: true, reason: "imdb id not found" });
        } else {
          const url =
            "https://imdb-api.com/en/API/FullCast/k_a6821i63/" + movie.imdbID;
          restClient({ url }, (err, res) => {
            if (err) {
              callback({ err, reason: "movie details api failed" });
            } else {
              callback(null, res);
            }
          });
        }
      },
    ],
    (err, result) => {
      if (err) {
        responseHandler(err);
      } else {
        responseHandler(null, result);
      }
    }
  );
};

module.exports = {
  getPopularMovies,
  searchMovies,
  searchWeather,
  searchRepos,
  getUsers,
  getPosts,
  addUser,
  addPost,
  updatePost,
  updateUser,
  deletePost,
  deleteUser,
  getUserPosts,
  getRelated,
  getMovieDetails,
};
