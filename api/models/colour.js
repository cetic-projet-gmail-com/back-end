module.exports = (sequelize, type) => {
    const Colour = sequelize.define('colour', {
        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
        timestamps: false
    });

    Colour.associate = (models) => {
        // console.log(models);
        Colour.hasMany(models.Activity, {foreignKey: 'colour_id', as: 'colour'}); // 1-n
    }
    return Colour;
}