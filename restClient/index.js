const request = require("request");

module.exports = (
  { method = "GET", url = "", data, params, headers },
  responseHandler
) => {
  const options = { method, url };
  if (!url || typeof url !== "string") {
    responseHandler("url is missing");
  } else {
    if (headers) {
      options.headers = headers;
    }
    if (params) {
      options.qs = params;
    }
    if (data) {
      options.json = true;
      options.body = data;
    }
    request(options, function (err, res, body) {
      if (err) {
        responseHandler(err.message);
      } else {
        let json = isJSON(body);
        responseHandler(null, json);
      }
    });
  }
};

const isJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};
