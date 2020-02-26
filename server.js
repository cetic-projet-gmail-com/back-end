//config values
const dotEnv = require('dotenv')
dotEnv.config({ path: './development.env' })

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

/*const Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

}, {
  timestamps: false
});*/

const initApp = () => {
  const app = require('./app')
  app.listen(process.env.PORT, () => {
    console.log(`Express app is running at port : ${process.env.PORT}`)


    // Role.findOne({where :{id: 3}}).then(role => {
    //   console.log(role);
    // })


    // Role.bulkCreate([{name: "user"},{name: "moderator"},{name: "administrator"}]).then(role => {
    //   console.log(role);;
    // });

  })
}
