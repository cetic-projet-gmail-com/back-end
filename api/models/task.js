module.exports = (sequelize, type) => {
    const Task = sequelize.define('task', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        activity_id: {
            type: type.INTEGER,
            allowNull: false
        },
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
            type: type.DATE,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        underscored: true,
        timestamps: false
    });

    Task.associate = (models) => {
        // console.log(models);
        Task.belongsTo(models.Activity, { foreignKey: 'activity_id', as: 'activity' }); // 1-1

        Task.hasMany(models.Event, { foreignKey: 'task_id', as: 'events' }); // 1-n

        Task.belongsToMany(models.User, { through: models.Tasks_assignment, foreignKey: 'task_id', as: 'users' })
    }
    return Task;
}