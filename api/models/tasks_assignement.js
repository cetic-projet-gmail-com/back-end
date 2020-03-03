module.exports = (sequelize, type) => {
    const TasksAssignement = sequelize.define('tasksAssignement', {
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

    TasksAssignement.associate = (models) => {
        // console.log(models);
        TasksAssignement.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // 1-1

        TasksAssignement.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' }); // 1-1
    }
    return TasksAssignement;
}