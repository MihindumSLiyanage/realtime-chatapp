const express = require("express");
const router = express.Router();

const {
    addMessage,
    getMessages
} = require("../controller/messageController");

//send a message
router.post("/addmsg/", addMessage);

//get a message
router.post("/getmsg/", getMessages);

module.exports = router;