require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
    signInToken
} = require("../config/auth");

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = signInToken(user);
            res.send({
                token,
                _id: user._id,
                username: user.username,
                email: user.email,
                avatarImage: user.avatarImage,
            });
        } else {
            res.status(401).send({
                message: "Incorrect Username or Password!",
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const isAdded = await User.findOne({
            email: req.body.email
        });
        if (isAdded) {
            return res.status(403).send({
                message: "This Email already Added!",
            });
        } else {
            const newuser = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            });
            const user = await newuser.save();
            const token = signInToken(user);
            res.send({
                token,
                _id: user._id,
                username: user.username,
                email: user.email,
                message: "Email Verified, Please Login Now!",
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({
            _id: -1
        });
        res.send(users);
    } catch (err) {
        res.status(500).send({
            message: err.message
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

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username;
            user.email = req.body.email;

            const updatedUser = await user.save();
            const token = signInToken(updatedUser);

            res.send({
                token,
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
            });
        }
    } catch (err) {
        res.status(404).send({
            message: "Your email is not valid!",
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: "User Id is required"
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

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    logoutUser
};