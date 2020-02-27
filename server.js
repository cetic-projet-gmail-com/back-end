// //config values
// const dotEnv = require('dotenv')
// dotEnv.config({ path: './development.env' })

// //mysql db management


// const initApp = () => {
//   const app = require('./app')
//   app.listen(process.env.PORT, () => {
//     console.log(`Express app is running at port : ${process.env.PORT}`)


//     // Role.findOne({where :{id: 3}}).then(role => {
//     //   console.log(role);
//     // })


//     // Role.bulkCreate([{name: "user"},{name: "moderator"},{name: "administrator"}]).then(role => {
//     //   console.log(role);;
//     // });

//   })
// }