const express = require('express');
const AdminRouter = require('./api/routes/administration')
const HomeRouter = require('./api/routes/home')
const ProfileRouter = require('./api/routes/profile')
const bodyParser = require('body-parser')

const app = express();

//GLOBAL MIDDLEWARES
app.use(bodyParser.json())

// SPECIFIC ROUTES
// app.use('/', HomeRouter)
// app.use('/profile', ProfileRouter)
app.use('/adminiatration', AdminRouter)
module.exports = app;