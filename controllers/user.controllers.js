const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

let users = JSON.parse(readFileSync(path.join(__dirname, "../config/db.json")));

// get all users

const allUser = (req, res) => {
  const { limit = users.length, page = 1 } = req.query;
  const sliceUser = users.slice(
    Number(limit * page - limit),
    Number(limit * page)
  );
  res.status(200).json(sliceUser);
};

// get a user
const singleUser = (req, res) => {
  const { id } = req.params;
  const singleUser = users.find((user) => user.id == Number(id));
  res.status(200).json(singleUser);
  console.log("here a single user is found");
};

// add new user
const addUser = (req, res) => {
  const { id, name, gender, contact, address, photoUrl } = req.body;
  if (!id || !name || !gender || !contact || !address || !photoUrl) {
    res.status(400).send("all fields are required!");
    return;
  } else {
    users.push(req.body);
    writeFileSync(
      path.join(__dirname, "../config/db.json"),
      JSON.stringify(users)
    );
    res
      .status(200)
      .json({ message: "A new user has been added", users: users });
  }
};

// update a user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, gender, contact, address, photoUrl } = req.body;

  const data = users.find((user) => user.id == Number(id));
  console.log(data);

  if (data) {
    users[users.indexOf(data)] = {
      ...data,
      name,
      gender,
      contact,
      address,
      photoUrl,
    };
    writeFileSync(
      path.join(__dirname, "../config/db.json"),
      JSON.stringify(users)
    );
    res.status(200).send(users);
  } else {
    res.status(404).send("user not found");
  }
};

// delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;
  const dataCheck = users.find((user) => user.id == Number(id));

  if (dataCheck) {
    const newData = users.filter((user) => user.id != Number(id));
    writeFileSync(
      path.join(__dirname, "../config/db.json"),
      JSON.stringify(newData)
    );
    res.status(200).json({
      message: "deleted successfully",
    });
  } else {
    res.status(404).send("user not found");
  }
};

// controllers export
module.exports = { allUser, singleUser, addUser, updateUser, deleteUser };
