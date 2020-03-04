const { User, Department, Role } = require('../../sequelize');
let resErrors = require(process.cwd() + '/api/helpers/res-errors');


exports.findProfile = async (req, res) => {
    let user = await User
        .findOne({
            where: { id: 99 },
            include: ['role', 'department']
        })
        .then((user) => {
            return { user };
        })
        .catch((err) => {
            console.log("Error while find user : ", err)
        })
    // Department
    //     .findOne({
    //         where: { id: 9 },
    //         // include: [{ model: User }]
    //     })
    //     .then((department) => {
    //         console.log(department)
    //     })
    //     .catch((err) => {
    //         console.log("Error while find user : ", err)
    //     })
    res.json(user);
}

exports.updateProfile = async (req, res) => {
    let user_id = req.payload.id;

    res.json({ "infos": "profile updated" });
}