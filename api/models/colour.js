module.exports = (sequelize, type) => {
    const Colour = sequelize.define( 'colour', {
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
        underscored: true,
        timestamps: false
    });
    Colour.associate = (models) => {
        console.log(models);

        Colour.hasMany(models.Activity);
    }
}