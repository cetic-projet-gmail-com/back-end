module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        login: {
            type: type.STRING,
            allowNull: false
        },
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING,
            allowNull: false
        },
        department_id: {
            type: type.INTEGER,
            allowNull: true
        },
        created_at: {
            type: type.DATE,
            allowNull: false
        },
        updated_at: {
            type: type.DATE,
            allowNull: false
        },
        role_id: {
            type: type.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        email: {
            type: type.STRING
        },
        passw: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    });
    User.associate = (models) => {
        console.log(models);

        User.hasMany(models.Department, { foreignKey: 'user_id', as: 'responsible_id' })
    }
    return User;
}