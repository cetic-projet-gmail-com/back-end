module.exports = (sequelize, type) => {
    const A_type = sequelize.define('a_type', {
        name: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
        timestamps: false
    });

    A_type.associate = (models) => {
        // console.log(models);
        A_type.hasMany(models.Activity, {foreignKey: 'a_type_id', as: 'type'}); // 1-n
    }
    return A_type;
}