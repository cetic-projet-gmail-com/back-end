module.exports = (sequelize, type) => {
    const Tasks_assignement = sequelize.define('activities_assignement', {
        user_id: {
            type: type.INTEGER
        },
        task_id: {
            type: type.INTEGER
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
            type: type.DATE,
            allowNull: false
        }
    }, {
        underscored: true,
        timestamps: false
    });

    Tasks_assignement.associate = (models) => {
        // console.log(models);
        Tasks_assignement.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); // 1-1

        Tasks_assignement.belongsTo(models.Task, { foreignKey: 'task_Id', as: 'task' }); // 1-1
    }
    return Tasks_assignement;
}