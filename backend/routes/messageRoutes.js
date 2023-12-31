const express = require("express");
const router = express.Router();

const {
    addMessage,
    getMessages
} = require("../controller/messageController");

//send a message
router.post("/send", addMessage);

//get a message
router.get("receive", getMessages);

module.exports = router;