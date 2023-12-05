const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDataBase = require('../config/db');

connectDataBase();

app.use(express.json());
app.use(cors());

//root route
app.get('/', (req, res) => {
    res.send('App works properly!');
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

