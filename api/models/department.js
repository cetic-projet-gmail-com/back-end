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
        responsibleId: {
            type: type.INTEGER
        },
        createdAt: {
            type: type.DATE,
            allowNull: false
        },
        updatedAt: {
            type: type.DATE,
            allowNull: false
        }
    }, {
    });
    Department.associate = (models) => {
    }
    return Department;
}