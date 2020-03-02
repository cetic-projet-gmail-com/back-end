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
        console.log(models);
        
    }
    return A_type;
}