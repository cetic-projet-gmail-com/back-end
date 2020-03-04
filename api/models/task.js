module.exports = (sequelize, type) => {
    const Task = sequelize.define('task', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        activityId: {
            type: type.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
    });

    Task.associate = (models) => {
        // Task.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity' }); // 1-1

        // Task.hasMany(models.Event, { foreignKey: 'taskId', as: 'events' }); // 1-n

        // Task.belongsToMany(models.User, { through: models.TasksAssignment, foreignKey: 'taskId', as: 'users' })
    }
    return Task;
}