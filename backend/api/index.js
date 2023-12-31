const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDataBase = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const messageRoutes = require('../routes/messageRoutes');

connectDataBase();

app.use(express.json());
app.use(cors());

//root route
app.get('/', (req, res) => {
    res.send('App works properly!');
});

app.use('/api/user/', userRoutes);
app.use('/api/message/', messageRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

