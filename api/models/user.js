const Model = Sequelize.Model;
class User extends Model { }
User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    department_id: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    role_id: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    passw: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING
    }

}, {
    sequelize,
    modelName: 'user'
    // options
});