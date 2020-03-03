module.exports = (sequelize, type) => {
    const AType = sequelize.define('aType', {
        name: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
    });

    AType.associate = (models) => {
        // console.log(models);
        AType.hasMany(models.Activity, {foreignKey: 'aTypeId', as: 'type'}); // 1-n
    }
    return AType;
}