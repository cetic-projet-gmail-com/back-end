const { Role } = require(`${process.cwd()}/sequelize`)

exports.find = async (req, res) => {
    let roles = await Role
        .findAll({
            include: ['users']
        })
        .then((roles) => {
            if (roles.length > 0) {
                return roles
            } else {
                return []
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ roles });
}

exports.findById = async (req, res) => {
    let { id } = req.params;
    let role = await Role
        .findOne({
            where: { id: id },
            include: ['users']
        })
        .then((role) => {
            if (role) {
                return role
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ role });
}