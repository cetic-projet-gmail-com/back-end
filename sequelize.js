const dotEnv = require('dotenv')
dotEnv.config({ path: './development.env' })
const UserModel = require('./api/models/user')
const DepartmentModel = require('./api/models/department')
const RoleModel = require('./api/models/role')
const TaskModel = require('./api/models/task')
const EventModel = require('./api/models/event')
const ColourModel = require('./api/models/colour')
const ActivityModel = require('./api/models/activity')

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, '', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

User = UserModel(sequelize, Sequelize)
Department = DepartmentModel(sequelize, Sequelize)
Role = RoleModel(sequelize, Sequelize)
Task = TaskModel(sequelize, Sequelize)
Event = EventModel(sequelize, Sequelize)
Colour = ColourModel(sequelize, Sequelize)
Activity = ActivityModel(sequelize, Sequelize)


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // initApp();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {User, Department, Role, Task, Event, Colour, Activity}