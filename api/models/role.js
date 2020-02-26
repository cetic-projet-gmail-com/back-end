const sequelize = require('sequelize')

const  Role = sequelize.define( 'role', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }

}, {
    timestamps : false
});

module.exports = Role