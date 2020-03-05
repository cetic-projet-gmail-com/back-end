module.exports = (sequelize, type) => {
    const Colour = sequelize.define('colour', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        code: {
            type: type.STRING,
            allowNull: false
        }
    }, {
    });

    Colour.associate = (models) => {
        // Colour.hasMany(models.Activity, {foreignKey: 'colourId', as: 'colour'}); // 1-n
    }
    return Colour;
}