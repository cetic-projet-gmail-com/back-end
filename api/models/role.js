module.exports = (sequelize, type) => {
    const Role = sequelize.define('role', {
        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
        // timestamps: false
    });

    Role.associate = (models) => {
        console.log(models);
        Role.hasMany(models.User, {as: users});
        Department.belongsTo(models.User, { foreignKey: 'user_id', as: 'responsible' });
    }
    return Role;
}