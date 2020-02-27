module.exports = (sequelize, type) => {
    const Role = sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Role.associate = (models) => {
        Role.hasMany(models.User)
    }
}