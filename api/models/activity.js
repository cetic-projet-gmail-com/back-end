module.exports = (sequelize, type) => {
    const Activity = sequelize.define('activity', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        projectManagerId: {
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
        colourId: {
            type: type.INTEGER,
            allowNull: false
        },
        aTypeId: {
            type: type.INTEGER,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        crmId: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        
    });

    Activity.associate = (models) => {
        // Activity.belongsTo(models.AType, { foreignKey: 'aTypeId', as: 'type' }); // 1-1

        // Activity.belongsTo(models.Colour, { foreignKey: 'colourId', as: 'colour' }); // 1-1

        // Activity.belongsTo(models.User, {foreignKey: 'projectManagerId', as: 'projectManager'}); // 1-1

        // Activity.hasMany(models.Task, { foreignKey: 'activityId', as: 'tasks'}); // 1-n

        // Activity.belongsToMany(models.User, { through: models.ActivityAssignment, foreignKey: 'activityId', as: 'users' })

    }
    return Activity;
}