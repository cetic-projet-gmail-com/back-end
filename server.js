//config values
const dotEnv = require('dotenv')
dotEnv.config({path: './development.env'})
console.log('ici');



//mysql db management

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
console.log('ici');

// mongoose.Promise = global.Promise;
// mongoose.set('debug',true)
// mongoose.connect(process.env.DB_HOST,{useNewUrlParser: true ,useUnifiedTopology: true })
// .then(()=>{
//     console.log('Mongodb server is running and ready to be called')
//     initApp()
// })
// .catch(e=>{
//     console.log(e)
// })
// const initApp=()=>{
//     const app = require('./app')
//     app.listen(process.env.PORT,()=>{
//         console.log(`Express app is running at port : ${process.env.PORT}`)
//     })
    
// }
