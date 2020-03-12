module.exports = (sequelize, type) => {
    const Colour = sequelize.define('colour', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        code: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Colour.associate = (models) => {
    }
    return Colour;
}