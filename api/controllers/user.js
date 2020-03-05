const User = require(`${process.cwd()}/sequelize`)

exports.findById = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let user = await User
        .findOne({
            where: { id: id },
            include: ['role', 'department']
        })
        .then((user) => {
            if (user) {
                return { user: user };
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(user);
}

exports.find = async (req, res) => {
    let users = await User
        .findAll({
            include: ['role', 'department']
        })
        .then((users) => {
                console.log('test 2');
            if (users.length > 0) {
                return { users: users }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.stats(200).json(users);
}