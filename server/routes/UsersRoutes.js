const express = require("express");
const {
  getAllUsers,
  getUserByEmail,
  deleteUser,
  
} = require("../controller/UsersController");
const{changeUserRole}=require("../controller/authController")
const jwtMiddleware = require("../middleware/jwtMiddleware");

const router = express.Router();
// all these routes are protected because they are admin features

// get all users
router.get("/getAll",  jwtMiddleware,getAllUsers);
// get one user by his email
router.get("/getOne/:email", jwtMiddleware, getUserByEmail);
// delete a user by his email
router.delete("/delete/:email",  jwtMiddleware,deleteUser);
// update/change user's role
router.put("/change-role",jwtMiddleware, changeUserRole);

module.exports = router;
