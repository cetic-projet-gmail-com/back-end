module.exports = (sequelize, type) => {
    const ActivitiesAssignement = sequelize.define('activitiesAssignement', {
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

    ActivitiesAssignement.associate = (models) => {
        // console.log(models);
        ActivitiesAssignement.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // 1-1

        ActivitiesAssignement.belongsTo(models.Activity, { foreignKey: 'ActivityId', as: 'Activity' }); // 1-1
    }
    return ActivitiesAssignement;
}