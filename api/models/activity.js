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
        project_manager_id: {
            type: type.INTEGER,
            allowNull: true
        },
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
            type: type.DATE,
            allowNull: false
        },
        colour_id: {
            type: type.INTEGER,
            allowNull: false
        },
        a_type_id: {
            type: type.INTEGER,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        crm_id: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
        timestamps: false
    });

    Activity.associate = (models) => {
        // console.log(models);
        Activity.belongsTo(models.A_type, { foreignKey: 'a_type_id', as: 'type' }); // 1-1

        Activity.belongsTo(models.Colour, { foreignKey: 'colour_id', as: 'colour' }); // 1-1

        Activity.belongsTo(models.User, {foreignKey: 'project_manager_id', as: 'projectManager'}); // 1-1

        Activity.hasMany(models.Task, { foreignKey: 'activity_id', as: 'tasks'}); // 1-n

        Activity.belongsToMany(models.User, { through: models.Activity_assignment, foreignKey: 'activity_id', as: 'users' })

    }
    return Activity;
}