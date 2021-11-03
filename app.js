require("dotenv").config();
const express = require("express");
const routes = require("./routes/users");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

const app = express();
const port = 4000;

app.use(express.json());
app.use("/", routes);
app.use(helmet());
app.use(compression());
app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.listen(port, () => {
  console.log("server running on " + port);
});
