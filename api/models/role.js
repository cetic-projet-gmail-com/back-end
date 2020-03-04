module.exports = (sequelize, type) => {
    const Role = sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        // underscored: true,
        timestamps: false
    });

    Role.associate = (models) => {
        // Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' }); // 1-n
    }
    return Role;
}