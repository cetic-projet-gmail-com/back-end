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
        // Department.hasMany(models.User, { foreignKey: 'departmentId', as: 'employees' }); // 1-n

        // Department.belongsTo(models.User, { foreignKey: 'responsibleId', as: 'responsible', constraints: false }); // 1-1
    }
    return Department;
}