module.exports = (sequelize, type) => {
    const Activity = sequelize.define('activity', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        projectManagerId: {
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
        colourId: {
            type: type.INTEGER,
            allowNull: false
        },
        aTypeId: {
            type: type.INTEGER,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        crmId: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        
    });

    Activity.associate = (models) => {
    }
    return Activity;
}