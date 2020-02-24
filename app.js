const express = require('express');
const AdminRouter = require('./api/routes/admin')
const HomeRouter = require('./api/routes/home')
const ProfileRouter = require('./api/routes/profile')
const bodyParser = require('body-parser')

const app = express();

//GLOBAL MIDDLEWARES
app.use(bodyParser.json())

// SPECIFIC ROUTES
// app.use('/', HomeRouter)
// app.use('/profile', ProfileRouter)
// app.use('/admin', AdminRouter)
module.exports = app;

