module.exports = (sequelize, type) => {
    const Department = sequelize.define('department', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        responsible_id: {
            type: type.INTEGER
        },
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
            type: type.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    });
    Department.associate = (models) => {
        console.log(models);
    }
}