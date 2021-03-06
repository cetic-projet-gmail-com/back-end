const { User } = require(`${process.cwd()}/sequelize`);
let resErrors = require(`${process.cwd()}/api/helpers/res-errors`);


exports.find = async (req, res) => {
    let userId = req.payload.id
    let user = await User
        .findOne({
            where: { id: userId },
            include: ['role', 'department']
        })
        .then((user) => {
            if (user) {
                return user;
            }
        })
        .catch((err) => {
            console.log(`Error while finding user(${userId}) : ${err}`)
        })
    res.status(200).json({user});
}

exports.update = async (req, res) => {
    let { id } = req.payload;
    let updatedUser = req.body;
    await User
        .update({
            // login: updatedUser.login ? updatedUser.login : undefined,
            // firstName: updatedUser.firstName ? updatedUser.firstName : undefined,
            // lastName: updatedUser.lastName ? updatedUser.lastName : undefined,
            // password: updatedUser.password ? updatedUser.password : undefined,
            // roleId: updatedUser.roleId ? updatedUser.roleId : undefined,
            // email: updatedUser.email ? updatedUser.email : undefined,
            // departmentId: updatedUser.departmentId ? updatedUser.departmentId : undefined
            email : updatedUser.email,
            password: updatedUser.password
        },
            {
                where: { id: id }
            }).then(() => {
                return res.status(200).json({"infos": "profil mis à jour"})
            })
        .catch((err) => {
            return res.status(422).json({"infos": "errors"})

        })

    // let user = await User
    //     .findOne({
    //         where: { id: id },
    //         include: ['role', 'department','']
    //     })
    //     .then((user) => {
    //         if (user) {
    //             user.password = undefined
    //             return user;
    //         }
    //     })
    //     .catch((err) => {
    //         return res.status(422)
    //         console.log(`The following error has occured: ${err}`);
    //     })
    // res.status(200).json({ user });
}