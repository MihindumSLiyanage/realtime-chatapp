require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.findOne({
            username
        });
        if (!user)
            return res.json({
                message: "Incorrect Username or Password",
                status: false
            });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({
                message: "Incorrect Username or Password",
                status: false
            });
        delete user.password;
        return res.json({
            status: true,
            user
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const usernameCheck = await User.findOne({
            username
        });
        if (usernameCheck)
            return res.json({
                message: "Username already used",
                status: false
            });
        const emailCheck = await User.findOne({
            email
        });
        if (emailCheck)
            return res.json({
                message: "Email already used",
                status: false
            });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({
            status: true,
            user
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
          ]);
          return res.json(users);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: "User Id is required",
            });
        }
        onlineUsers.delete(req.params.id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const setAvatar = async (req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId, {
                isAvatarImageSet: true,
                avatarImage,
            }, {
                new: true
            }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    logoutUser,
    setAvatar
};