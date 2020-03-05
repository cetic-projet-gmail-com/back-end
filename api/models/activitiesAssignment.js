module.exports = (sequelize, type) => {
    const ActivitiesAssignment = sequelize.define('activitiesAssignment', {
        userId: {
            type: type.INTEGER,
            // primaryKey: true,
            // autoIncrement: true
        },
        activityId: {
            type: type.INTEGER,
            // primaryKey: true,
            // autoIncrement: true
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
        // underscored: true,
        // timestamps: false
    });

    ActivitiesAssignment.associate = (models) => {
        // ActivitiesAssignment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // 1-1

        // ActivitiesAssignment.belongsTo(models.Activity, { foreignKey: 'ActivityId', as: 'Activity' }); // 1-1
    }
    return ActivitiesAssignment;
}