require("dotenv").config();
const Message = require("../models/Message");

const getMessages = async (req, res) => {
    try {
        const {
            from,
            to
        } = req.body;

        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({
            updatedAt: 1
        });

        const projectedMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const addMessage = async (req, res) => {
    try {
        const {
            from,
            to,
            message
        } = req.body;
        const data = await Message.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({
            message: "Message added successfully."
        });
        else return res.json({
            message: "Failed to add message to the database"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

module.exports = {
    getMessages,
    addMessage,
};