const Sequelize = require('sequelize')

const Model = Sequelize.Model;

const Department = Sequelize.define('department', {
    // attributes
    id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsible_id: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
});


module.exports = Role