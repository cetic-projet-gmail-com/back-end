module.exports = (sequelize, type) => {
    const Event = sequelize.define('event', {
        user_id: {
            type: type.INTEGER,
            allowNull: false
        },
        task_id: {
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
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
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
        underscored: true,
        timestamps: false
    });

    Event.associate = (models) => {
        // console.log(models);
        Event.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); // 1-1

        Event.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' }); // 1-1
    }
    return Event;
}