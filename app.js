const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/app");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/", routes);
app.route("/").get((req, res, next) => {
  res.sendFile(process.cwd() + "/public/index.html");
  next();
});
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path, error);
  res.send(`<h2>something went wrong, we will be back shortly</h2>`);
});

app.listen(port, () => {
  console.log("server running on " + port);
});
