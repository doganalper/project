const express = require('express');
const cors = require('cors');
const database = require('./database');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRoutes);

app.listen(3000)