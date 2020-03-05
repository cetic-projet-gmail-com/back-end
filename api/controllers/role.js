const { Role } = require(`${process.cwd()}/sequelize`)

exports.find = async (req, res) => {
    let roles = await Role
        .findAll({
            include: ['users']
        })
        .then((roles) => {
            if (roles.length > 0) {
                return { roles: roles }
            } else {
                return {roles:[]}
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(roles);
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
                return { role: role };
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(role);
}