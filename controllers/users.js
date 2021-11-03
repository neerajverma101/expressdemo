const fs = require("fs");
const UserModel = require("../models/users");

const getUsersJSON = () => {
  const users = fs.readFileSync("./db/users.json");
  return JSON.parse(users);
};

const saveUsers = (data) => {
  const users = JSON.stringify(data);
  fs.writeFileSync("./db/users.json", users);
};

const getUser = (req, res, next) => {
  const userName = req.params.username;
  const users = getUsersJSON();

  if (req.query.db) {
    UserModel.findOne({ userName }, (err, data) => {
      if (err) return res.send({ error: true, message: err });
      res.json(data);
    });
    return;
  }

  if (userName) {
    const user = users.find((user) => user.userName === userName);
    if (user) {
      res.send(user);
    } else {
      res.status(401).send({ error: true, message: "user not found" });
    }
  } else {
    res.status(409).send({ error: true, message: "user data missing" });
  }
};

const getAllUsers = (req, res, next) => {
  //call 3rd party api

  if (req.query.db) {
    UserModel.find({}, (err, data) => {
      if (err) {
        return res.json({ Error: err });
      }
      return res.json(data);
    });
  } else res.json(getUsersJSON());
};

const addUser = (req, res, next) => {
  const userData = req.body;
  const { userName, password, age } = userData;
  const users = getUsersJSON();
  if (req.query.db) {
    UserModel.findOne({ userName }, (err, data) => {
      if (!data) {
        const user = new UserModel({
          userName,
          password,
          age,
        });
        user.save((err, data) => {
          if (err) return res.send({ error: true, message: err });
          return res.json(data);
        });
      } else {
        if (err) return res.send({ error: true, message: err });
        res.status(409).send("user name already exist");
      }
    });
    return;
  }

  if (!userName || !password || !age) {
    res.status(401).send({ error: true, message: "user data missing" });
  }
  if (users.findIndex((userObj) => userObj.userName === userName) > -1) {
    res.status(409).send({ error: true, message: "user name already exists" });
  } else {
    saveUsers([...users, userData]);
    res.send({ error: false, message: "user " + userName + " added" });
  }
};

const deleteUser = (req, res, next) => {
  const userName = req.params.username;
  const users = getUsersJSON();

  if (req.query.db) {
    UserModel.deleteOne({ userName }, (err, data) => {
      if (err) return res.send({ error: true, message: err });
      res.send({
        error: false,
        message: "user " + userName + " deleted from db",
      });
    });
    return;
  }

  const filteredUsers = users.filter((user) => user.userName !== userName);
  if (users.length === filteredUsers.length) {
    res.status(409).send({ error: true, message: "user not found" });
  } else {
    res
      .status(200)
      .send({ error: false, message: "user " + userName + " deleted" });
    saveUsers(filteredUsers);
  }
};

const updateUser = (req, res, next) => {
  const userName = req.params.username;
  const userData = req.body;

  if (req.query.db) {
    UserModel.updateOne({ userName }, userData, async (err, data) => {
      if (err) return res.send({ error: true, message: err });
      return res.json(data);
    });
    return;
  }

  if (!userName || !userData) {
    return res.status(409).send({ error: true, message: "user data missing" });
  }
  const users = getUsersJSON();
  const userIndex = users.findIndex((userObj) => userObj.userName === userName);
  if (userIndex > -1) {
    users[userIndex] = userData;
    saveUsers(users);
    res.send({ error: false, message: "user " + userName + " updated" });
  } else {
    res.status(401).send({ error: true, message: "username not found" });
  }
};

module.exports = { getAllUsers, addUser, updateUser, deleteUser, getUser };
