const express = require("express");
const routes = require("./routes/app");

const app = express();
const port = 4000;

app.use(express.json());
app.use("/", routes);
app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port, () => {
  console.log("server running on " + port);
});
