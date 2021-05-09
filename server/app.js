const express = require('express');
const cors = require('cors');
const database = require('./database');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/User');
const projectRoutes = require('./routes/Projects');
const teamRoutes = require('./routes/Teams');
const stageRoutes = require('./routes/Stages');
const jobRoutes = require('./routes/Jobs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// URLS
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);
app.use('/teams', teamRoutes);
app.use('/stage', stageRoutes);
app.use('/job', jobRoutes);

app.listen(3000)