module.exports = (sequelize, type) => {
    const Event = sequelize.define('event', {
        userId: {
            type: type.INTEGER,
            allowNull: false
        },
        taskId: {
            type: type.INTEGER,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: true
        },
        duration: {
            type: type.FLOAT,
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
        start: {
            type: type.DATE,
            allowNull: true
        },
        end: {
            type: type.DATE,
            allowNull: true
        }
    }, {
    });

    Event.associate = (models) => {
        // console.log(models);
        Event.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // 1-1

        Event.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' }); // 1-1
    }
    return Event;
}