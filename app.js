const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/app");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/", routes);
app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port, () => {
  console.log("server running on " + port);
});
