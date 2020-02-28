module.exports = (sequelize, type) => {
    const Activities_assignement = sequelize.define('activities_assignement', {
        user_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        activity_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    Activities_assignement.associate = (models) => {
        console.log(models);
        Activities_assignement.belongsTo(models.User, { foreignKey: 'user_id' });
        Activities_assignement.belongsTo(models.Activity, { foreignKey: 'activity_id' });
    }
    return Activities_assignement;
}