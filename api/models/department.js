const sequelize = require('sequelize')

const Department = sequelize.define('department', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    responsible_id: {
        type: sequelize.INTEGER
    },
    created_at: {
        type: sequelize.DATE,
        allowNull: false
    },
    updated_at: {
        type: sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Department