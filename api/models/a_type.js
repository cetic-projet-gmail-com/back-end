module.exports = (sequelize, type) => {
    const A_type = sequelize.define('role', {
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
        underscored: true,
        timestamps: false
    });

    A_type.associate = (models) => {
        console.log(models);
        A_type.hasMany(models.Activity);
    }
    return A_type;
}