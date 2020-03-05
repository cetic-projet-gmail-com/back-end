module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: type.STRING,
            allowNull: false
        },
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING,
            allowNull: false
        },
        departmentId: {
            type: type.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        },
        roleId: {
            type: type.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        email: {
            type: type.STRING
        },
        passw: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps:false
    });
    User.associate = (models) => {
        // User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' }); // 1-1

        // User.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'department' }); // 1-1

        // User.hasMany(models.Activity, { foreignKey: 'projectManagerId', as: 'managedActivities' }); // 1-n

        // User.hasMany(models.Event, { foreignKey: 'userId', as: 'events' }); // 1-n

        // User.belongsToMany(models.Task, { through: models.TasksAssignment, foreignKey: 'userId', as: 'tasks' })

        // User.belongsToMany(models.Activity, { through: models.ActivityAssignment, foreignKey: 'userId', as: 'activity' })
    }
    return User;
}