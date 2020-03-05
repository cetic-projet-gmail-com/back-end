const dotEnv = require('dotenv')
dotEnv.config({ path: './development.env' })
const UserModel = require('./api/models/user')
const DepartmentModel = require('./api/models/department')
const RoleModel = require('./api/models/role')
const TaskModel = require('./api/models/task')
const EventModel = require('./api/models/event')
const ColourModel = require('./api/models/colour')
const ActivityModel = require('./api/models/activity')
const ActivitiesAssignmentModel = require('./api/models/activitiesAssignment')
const TasksAssignmentModel = require('./api/models/tasksAssignment')
const ATypeModel = require('./api/models/aType')

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
ActivitiesAssignment = ActivitiesAssignmentModel(sequelize, Sequelize)
TasksAssignment = TasksAssignmentModel(sequelize, Sequelize)
AType = ATypeModel(sequelize, Sequelize)

/*      models associations       */

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' }); // 1-1
User.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' }); // 1-1
User.hasMany(Activity, { foreignKey: 'projectManagerId', as: 'managedActivities' }); // 1-n
User.hasMany(Event, { foreignKey: 'userId', as: 'events' }); // 1-n
User.belongsToMany(Task, { through: TasksAssignment, foreignKey: 'userId', as: 'tasks' })
User.belongsToMany(Activity, { through: ActivitiesAssignment, foreignKey: 'userId', as: 'activities' })
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' }); // 1-n
Department.hasMany(User, { foreignKey: 'departmentId', as: 'employees' }); // 1-n
Department.belongsTo(User, { foreignKey: 'responsibleId', as: 'responsible', constraints: false }); // 1-1
Task.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' }); // 1-1
Task.hasMany(Event, { foreignKey: 'taskId', as: 'events' }); // 1-n
Task.belongsToMany(User, { through: TasksAssignment, foreignKey: 'taskId', as: 'users' });
TasksAssignment.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // 1-1
TasksAssignment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' }); // 1-1
ActivitiesAssignment.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // 1-1
ActivitiesAssignment.belongsTo(Activity, { foreignKey: 'ActivityId', as: 'Activity' }); // 1-1
Activity.belongsTo(AType, { foreignKey: 'aTypeId', as: 'type' }); // 1-1
Activity.belongsTo(Colour, { foreignKey: 'colourId', as: 'colour' }); // 1-1
Activity.belongsTo(User, { foreignKey: 'projectManagerId', as: 'projectManager' }); // 1-1
Activity.hasMany(Task, { foreignKey: 'activityId', as: 'tasks' }); // 1-n
Activity.belongsToMany(User, { through: ActivitiesAssignment, foreignKey: 'activityId', as: 'users' })
AType.hasMany(Activity, { foreignKey: 'aTypeId', as: 'activities' }); // 1-n
Colour.hasMany(Activity, { foreignKey: 'colourId', as: 'colour' }); // 1-n
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // 1-1
Event.belongsTo(Task, { foreignKey: 'taskId', as: 'task' }); // 1-1







sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { User, Department, Role, Task, Event, Colour, Activity, ActivitiesAssignment, TasksAssignment, AType }