const sequelize = require('sequelize')

const User = sequelize.define('user', {
    login: {
        type: sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    department_id: {
        type: sequelize.INTEGER
    },
    created_at: {
        type: sequelize.DATE,
        allowNull: false
    },
    updated_at: {
        type: sequelize.DATE,
        allowNull: false
    },
    role_id: {
        type: sequelize.INTEGER
    },
    email: {
        type: sequelize.STRING
    },
    passw: {
        type: sequelize.STRING,
        allowNull: false
    },
    token: {
        type: sequelize.STRING
    }

}, {
    timestamps: false
});

module.exports = User;