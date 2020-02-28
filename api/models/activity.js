module.exports = (sequelize, type) => {
    const Activity = sequelize.define('activity', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false
        },
        project_manager_id: {
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
        colour_id: {
            type: type.INTEGER,
            allowNull: false
        },
        a_type_id: {
            type: type.INTEGER,
            allowNull: false
        },
        ended: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        crm_id: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
        timestamps: false
    });

    Activity.associate = (models) => {
        console.log(models);
    }
    return Activity;
}