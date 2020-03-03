const { User, Department, Role, } = require('../../sequelize');
let resErrors = require(process.cwd() + '/api/helpers/res-errors');


exports.findProfile = async (req, res) => {
    // let user_id = req.payload.id;
    // let id = 99;
    console.log("ici");
    User
        .findOne({
            where: { id: 99 },
            include: 'department'
        })
        .then((user) => {
            console.log(user.department)
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
    res.json({ "data": "user_data" });
}

exports.updateProfile = async (req, res) => {
    let user_id = req.payload.id;

    res.json({ "infos": "profile updated" });
}