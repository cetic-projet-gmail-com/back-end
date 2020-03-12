module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: type.STRING,
            allowNull: true
        },
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING,
            allowNull: false
        },
        departmentId: {
            type: type.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        },
        roleId: {
            type: type.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        email: {
            type: type.STRING,
            allowNull: true
        },
        password: {
            type: type.STRING,
            allowNull: false
        }
    }, {
    });
    User.associate = (models) => {
    }
    return User;
}