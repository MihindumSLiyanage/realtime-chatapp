const express = require("express");
const router = express.Router();

const {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    logoutUser,
    setAvatar
} = require("../controller/userController");

//login a user
router.post("/login", loginUser);

//register a user
router.post("/register", registerUser);

//logout a user
router.post("/logout/:id", logoutUser);

//get all users
router.get("/all/:id", getAllUsers);

//get a user
router.get("/:id", getUserById);

//update the avatar on user
router.post("/setavatar/:id", setAvatar);

module.exports = router;