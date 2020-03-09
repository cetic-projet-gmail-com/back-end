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

exports.create = async (req, res) => {
    let newTask = req.body;
    await Task
    .create({
        name: newTask.name,
        description: newTask.description,
        activityId: newTask.activityId,
        ended: newTask.ended
    })
    .then((task) => {
        this.newTask = task
    })
    .catch((err) => {
        res.status(500).json({ error: err })
    })
    res.status(200).json(newTask)
}