const { User } = require('../../sequelize');
let resErrors = require(process.cwd() + '/api/helpers/res-errors');


exports.find = async (req, res) => {
    let userId = req.payload.id
    let user = await User
        .findOne({
            where: { id: userId },
            include: ['role', 'department']
        })
        .then((user) => {
            if (user) {
                return { user: user };
            }
        })
        .catch((err) => {
            console.log(`Error while finding user(${userId}) : ${err}`)
        })
    res.json(user);
}

exports.updateProfile = async (req, res) => {
    let userId = req.payload.id;
    let updatedUser = req.body;
    User
        .findOne({
            where: { id: userId }
        })
        .then((user) => {
            if (user) {
                user.update(
                    {
                        email: updatedUser.email,
                        roleId: updatedUser.roleId,
                        departmentId: updatedUser.departmentId
                    }
                )
            }
        })
    res.status(200).json({ "infos": "profile updated" });
}