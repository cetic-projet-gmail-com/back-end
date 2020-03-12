module.exports = (sequelize, type) => {
    const Event = sequelize.define('event', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        },
        startAt: {
            type: type.DATE,
            allowNull: true
        },
        endAt: {
            type: type.DATE,
            allowNull: true
        }
    }, {
    });

    Event.associate = (models) => {
    }
    return Event;
}