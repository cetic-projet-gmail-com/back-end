const { TasksAssignment } = require(`${process.cwd()}/sequelize`)

exports.findByUserId = async (req, res) => {
    let { id } = req.params;
    let taskAssignment = await TasksAssignment
        .findAll({
            where: { id: id },
            include: ['task']
        })
        .then((taskAssignment) => {
            if (taskAssignment) {
                return taskAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(taskAssignment);
}

exports.findOne = async (req, res) => {
    let { userId, taskId } = req.params;
    let taskAssignment = await TasksAssignment
        .findOne({
            where:
            {
                userId: userId,
                taskId: taskId
            },
            include: ['task', 'user']
        })
        .then((taskAssignment) => {
            if (taskAssignment) {
                return taskAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(taskAssignment);
}

exports.create = async (req, res) => {
    let newTasksAssignment = req.body;
    await TasksAssignment
        .create({
            userId: newTasksAssignment.userId ? newTasksAssignment.userId : undefined,
            taskId: newTasksAssignment.taskId ? newTasksAssignment.taskId : undefined,
        })
        .then((taskAssignment) => {
            if (taskAssignment) {
                this.newTasksAssignment = taskAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(newTasksAssignment)
}

exports.delete = async (req, res) => {
    let { userId, taskId } = req.params;
    let qqch = await TasksAssignment
        .destroy({
            where:
            {
                userId: userId,
                taskId: taskId
            }
        })
        .then((unTruc) => {
            console.log(unTruc);
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    res.status(200).json(qqch);
}