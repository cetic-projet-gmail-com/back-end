const Sequelize = require('sequelize')

const Model = Sequelize.Model;

const  Role = Sequelize.define( 'role', {
    // attributes
    id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
});


module.exports = Role