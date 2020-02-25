// import Role from './api/models/role';

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
    initApp();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
console.log('ici');




const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
});




const initApp=()=>{

  

    const app = require('./app')
    app.listen(process.env.PORT,()=>{
      console.log(`Express app is running at port : ${process.env.PORT}`)

      Role.create({ name: "user"}).then(role => {
        console.log("Role's auto-generated ID:", role.id);
      });

    })  
}
