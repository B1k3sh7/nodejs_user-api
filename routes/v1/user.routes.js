const express = require("express");
const {
  allUser,
  singleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controllers");
const router = express.Router();

// get all user
router.route("/user/all").get(allUser);

// get a user
router.route("/user/:id").get(singleUser);

// add new user
router.route("/user/add").post(addUser);

// update a user
router.route("/user/:id").patch(updateUser);

// delete a user
router.route("/user/:id").delete(deleteUser);

module.exports = router;
