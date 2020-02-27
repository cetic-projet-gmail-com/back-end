module.exports = (sequelize, type) => {
    const Department = sequelize.define('department', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        responsible_id: {
            type: type.INTEGER,
            references: {
                model: user,
                key: id
            }
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