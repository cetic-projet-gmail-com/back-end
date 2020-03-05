module.exports = (sequelize, type) => {
    const TasksAssignment = sequelize.define('tasksAssignment', {
        userId: {
            type: type.INTEGER
        },
        taskId: {
            type: type.INTEGER
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        }
    }, {
    });

    TasksAssignment.associate = (models) => {
        // TasksAssignment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // 1-1

        // TasksAssignment.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' }); // 1-1
    }
    return TasksAssignment;
}