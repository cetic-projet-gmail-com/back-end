const { User, TasksAssignment, ActivitiesAssignment, Event, Activity, Department, sequelize } = require(`${process.cwd()}/sequelize`)
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
    let nbre = req.query.nbre ? parseInt(req.query.nbre) : 10;
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
                        next: page < (users.length / nbre) ? (route + (page + 1) + '&nbre=' + nbre) : undefined,
                        first: page > 1 ? route + '1&nbre' + nbre : undefined,
                        last: page < users.length / nbre ? route + Math.round(Math.ceil(users.length / nbre)) + '&nbre=' + nbre : undefined
                    }
                    return { users: tmpUsers, links }
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
    let user = await User
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
            if (user) {
                user.password = undefined;
                return user;
            }
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json({ user });
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

exports.delete = async (req, res) => {
    let { id } = req.params;

    try {
        const result = await sequelize.transaction(async (t) => {

            await Event
                .update({
                    userId: 0
                },
                    {
                        where: { userId: id }
                    }, { transaction: t })

            await ActivitiesAssignment
                .update({
                    userId: 0
                },
                    {
                        where: { userId: id }
                    }, { transaction: t })

            await TasksAssignment
                .update({
                    userId: 0
                },
                    {
                        where: { userId: id }
                    }, { transaction: t })

            await Activity
                .update({
                    projectManagerId: 0
                },
                    {
                        where: { projectManagerId: id }
                    }, { transaction: t })

            await Department
                .update({
                    responsibleId: 0
                },
                    {
                        where: { responsibleId: id }
                    }, { transaction: t })

            await User
                .destroy({
                    where: { id: id }
                }, { transaction: t })
        });
        res.json({ success: 'reussi' })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}