const async = require("async");
const restClient = require("../restClient");

const asyncRequest = (apisList, callback, mode = "parallel") => {
  let apis;
  if (Array.isArray(apisList) && apisList.length) {
    apis = apisList.map((api) => (cb) => restClient(api, cb));
  } else if (typeof apisList === "object" && typeof apisList !== null) {
    apis = Object.fromEntries(
      Object.entries(apisList).map(([key, val]) => [
        key,
        (cb) => restClient(val, cb),
      ])
    );
  }

  if (apis.length || typeof apis === "object") {
    if (mode === "series") {
      async.series(apis, callback);
    } else {
      async.parallel(apis, callback);
    }
  } else {
    callback("invalid api list");
  }
};

module.exports = asyncRequest;
