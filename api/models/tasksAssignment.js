module.exports = (sequelize, type) => {
    const TasksAssignment = sequelize.define('tasksAssignment', {
        userId: {
            type: type.INTEGER,
            primaryKey: true
        },
        taskId: {
            type: type.INTEGER,
            primaryKey: true
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
    }
    return TasksAssignment;
}