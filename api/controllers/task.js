const { Task } = require(`${process.cwd()}/sequelize`);

exports.findById = async (req, res) => {
    let { id } = req.params;
    let task = await Task
        .findOne({
            where: { id: id },
            include: ['activity', 'events', 'users']
        })
        .then((task) => {
            if (task) {
                return { task: task }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(task);
}

exports.find = async (req, res) => {
    let tasks = await Task
        .findAll({
            include: ['activity']
        })
        .then((tasks) => {
            if (tasks.length > 0) {
                return { tasks: tasks }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(tasks);
}