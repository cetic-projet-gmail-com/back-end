const { Task, sequelize, Event, TasksAssignment } = require(`${process.cwd()}/sequelize`);

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
    let task = await Task
        .create({
            name: newTask.name,
            description: newTask.description,
            activityId: newTask.activityId,
            ended: newTask.ended
        })
        .then((task) => {
            if (task) {
                return task
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({ task })
}

exports.update = async (req, res) => {
    let updatedTask = req.body;
    let { id } = req.params;
    await Task
        .update({
            name: updatedTask.name ? updatedTask.name : undefined,
            description: updatedTask.description ? updatedTask.description : undefined,
            activityId: updatedTask.activityId ? updatedTask.activityId : undefined,
            ended: updatedTask.ended ? updatedTask.ended : undefined,

            where: { id: id }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    let task = await Task
        .findOne({
            where: { id: id },
            include: ['activity']
        })
        .then((task) => {
            if (task) {
                return task;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    res.status(200).json({ task })
}

exports.delete = async (req, res) => {
    let { id } = req.params;

    try {
        const result = await sequelize.transaction(async (t) => {

            await Event
                .destroy(
                    {
                        where: { taskId: id }
                    }, { transaction: t })

            await TasksAssignment
                .destroy(
                    {
                        where: { taskId: id }
                    }, { transaction: t })

            await Task
                .destroy({
                    where: { id: id }
                }, { transaction: t })
        });
        res.status(200).json({ success: 'reussi' })
    } catch (error) {
        res.status(422).json(error);
    }
}