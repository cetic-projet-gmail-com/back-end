const express = require('express');
const AdminRouter = require('./api/routes/administration')
const HomeRouter = require('./api/routes/home')
const ProfileRouter = require('./api/routes/profile')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
dotEnv.config({ path: './development.env' })

const app = express();

//GLOBAL MIDDLEWARES
app.use(bodyParser.json())

// SPECIFIC ROUTES
// app.use('/', HomeRouter)
// app.use('/profile', ProfileRouter)
// app.use('/administration', AdminRouter)

  app.listen(process.env.PORT, () => {
    console.log(`Express app is running at port : ${process.env.PORT}`)


    // Role.findOne({where :{id: 3}}).then(role => {
    //   console.log(role);
    // })


    // Role.bulkCreate([{name: "user"},{name: "moderator"},{name: "administrator"}]).then(role => {
    //   console.log(role);;
    // });

  })