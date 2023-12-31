const express = require("express");
const router = express.Router();

const {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    logoutUser
} = require("../controller/userController");

//login a user
router.post("/login", loginUser);

//register a user
router.post("/register", registerUser);

//logout a user
router.post("/logout/:id", logoutUser);

//get all user
router.get("/", getAllUsers);

//get a user
router.get("/:id", getUserById);

//update a user
router.put("/:id", updateUser);

module.exports = router;