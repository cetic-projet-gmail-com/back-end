module.exports = (sequelize, type) => {
    const AType = sequelize.define('aType', {
        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    AType.associate = (models) => {
        // AType.hasMany(models.Activity, {foreignKey: 'aTypeId', as: 'type'}); // 1-n
    }
    return AType;
}