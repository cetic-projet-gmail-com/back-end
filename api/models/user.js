module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        login: {
            type: type.STRING,
            allowNull: false
        },
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING,
            allowNull: false
        },
        department_id: {
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
        role_id: {
            type: type.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        email: {
            type: type.STRING
        },
        passw: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    });
    User.associate = (models) => {
        // console.log(models);
        User.belongsTo(models.Role, { foreignKey: 'role_id' }); // 1-1

        User.belongsTo(models.Department, { foreignKey: 'department_id' }); // 1-1

        User.hasMany(models.Activity, { foreignKey: 'project_manager_id', as: 'managedActivities' }); // 1-n

        User.hasMany(models.Event, { foreignKey: 'user_id', as: 'events' }); // 1-n

        User.belongsToMany(models.Task, { through: models.Tasks_assignment, foreignKey: 'user_id', as: 'tasks' })

        User.belongsToMany(models.Activity, { through: models.Activity_assignment, foreignKey: 'user_id', as: 'activity' })
    }
    return User;
}