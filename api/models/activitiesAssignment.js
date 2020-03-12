module.exports = (sequelize, type) => {
    const ActivitiesAssignment = sequelize.define('activitiesAssignment', {
        userId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        activityId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    ActivitiesAssignment.associate = (models) => {
    }
    return ActivitiesAssignment;
}