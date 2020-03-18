const { User } = require(`${process.cwd()}/sequelize`)
const { formatISO } = require('date-fns')

exports.findById = async (req, res) => {
    let { id } = req.params;
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
    res.status(200).json({ user });
}

exports.find = async (req, res) => {
    let route = '/administration/users?page=';
    let nbre = req.query.nbre ? parseInt(req.query.nbre) : 20;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let paginate = req.query.paginate ? !(req.query.paginate == 'false') : true;

    let users = await User
        .findAll({
            include: ['role', 'department'],
            attributes: {
                exclude: ['password']
            }
        })
        .then((users) => {
            if (users.length > 0) {
                if (paginate) {
                    let tmpUsers = users.slice((page - 1) * nbre, page * nbre);
                    let links = {
                        current: `${route}${page}&nbre${nbre}`,
                        previous: page > 1 ? route + (page - 1) + '&nbre=' + nbre : undefined,
                        next: page < tmpUsers.length / nbre ? route + (page + 1) + '&nbre=' + nbre : undefined,
                        first: page > 1 ? route + '1&nbre' + nbre : undefined,
                        last: page < tmpUsers.length / nbre ? route + Math.round(Math.ceil(tmpUsers.length / nbre)) + '&nbre=' + nbre : undefined
                    }
                    return {users: tmpUsers, links}
                }
                else { return { users: users } }
            } else {
                return { users: [] }
            }
        })
        .catch((err) => {
            return res.status(500).json({ error: err })
        })
    res.status(200).json({ users });
}

exports.create = async (req, res) => {
    let newUser = req.body
    await User
        .create({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            login: newUser.login,
            password: newUser.password,
            roleId: newUser.roleId,
            email: newUser.email,
            departmentId: newUser.departmentId
        })
        .then((user) => {
            user.password = undefined;
            newUser = user;
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json({ newUser });
}

exports.update = async (req, res) => {
    let { id } = req.params;
    let updatedUser = req.body;

    await User
        .update(
            {
                login: updatedUser.login ? updatedUser.login : undefined,
                firstName: updatedUser.firstName ? updatedUser.firstName : undefined,
                lastName: updatedUser.lastName ? updatedUser.lastName : undefined,
                password: updatedUser.password ? updatedUser.password : undefined,
                roleId: updatedUser.roleId ? updatedUser.roleId : undefined,
                email: updatedUser.email ? updatedUser.email : undefined,
                departmentId: updatedUser.departmentId ? updatedUser.departmentId : undefined
            },
            {
                where: { id: id }
            }
        )
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    let user = await User
        .findOne({
            where: { id: id },
            include: ['role', 'department']
        })
        .then((user) => {
            if (user) {
                user.password = undefined
                console.log(user.updatedAt, formatISO(user.updatedAt));
                return user
            }
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json({ user });
}