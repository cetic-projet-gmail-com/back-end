module.exports = (sequelize, type) => {
    const AType = sequelize.define('aType', {
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
        timestamps: false
    });

    AType.associate = (models) => {
    }
    return AType;
}