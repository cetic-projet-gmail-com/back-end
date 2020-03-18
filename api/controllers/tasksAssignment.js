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
    let taskAssignment = await TasksAssignment
        .create({
            userId: newTasksAssignment.userId ? newTasksAssignment.userId : undefined,
            taskId: newTasksAssignment.taskId ? newTasksAssignment.taskId : undefined,
        })
        .then((taskAssignment) => {
            if (taskAssignment) {
                return taskAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({tasksAssignment})
}

exports.delete = async (req, res) => {
    let { userId, taskId } = req.params;
    await TasksAssignment
        .destroy({
            where:
            {
                userId: userId,
                taskId: taskId
            }
        })
        .then((deleted) => {
            if (deleted)
                res.status(200).json({ message: 'successfuly deleted the entry' })
            else
                return { message: 'the entry does not exist or couldn\'t be deleted' }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}