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
        console.log(models);
        Colour.hasMany(models.User);
    }
    return Colour;
}