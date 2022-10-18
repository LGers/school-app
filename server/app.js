require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
require('./models/models');
const cors = require('cors');
const mainRouter = require('./routes/mainRouter');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', mainRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log('Error:', error);
    }
};

start();
