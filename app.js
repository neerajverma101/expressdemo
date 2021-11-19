const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

global.__basedir = __dirname;
const corsConfig = {
  origin: "http://localhost:4000",
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", routes);
app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path, error);
  res
    .status(500)
    .send(`<h2>something went wrong, we will be back shortly</h2>`);
});

app.listen(port, () => {
  console.log("server running on " + port);
});
