const { Activity, ActivitiesAssignment, TasksAssignment, Event, Task, sequelize } = require(`${process.cwd()}/sequelize`)

exports.findById = async (req, res) => {
    let { id } = req.params;
    let activity = await Activity
        .findOne({
            where: { id: id },
            include: ['projectManager', 'tasks', 'colour', 'type', 'users']
        })
        .then((activity) => {
            if (activity) {
                return activity
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ activity });
}

exports.find = async (req, res) => {
    let activities = await Activity
        .findAll({
            include: ['projectManager', 'colour', 'type']
        })
        .then((activities) => {
            if (activities.length > 0) {
                return activities
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ activities })
}

exports.create = async (req, res) => {
    let newActivity = req.body;
    let activity = await Activity
        .create({
            name: newActivity.name,
            description: newActivity.description,
            projectManagerId: newActivity.projectManagerId,
            colourId: newActivity.colourId,
            aTypeId: newActivity.aTypeId,
            ended: newActivity.ended
        })
        .then((activity) => {
            if (activity) {
                return activity;
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })

    res.status(200).json({ activity });
}

exports.update = async (req, res) => {
    let updatedActivity = req.body;
    let { id } = req.params;

    await Activity
        .update({
            name: updatedActivity.name ? updatedActivity.name : undefined,
            description: updatedActivity.description ? updatedActivity.description : undefined,
            projectManagerId: updatedActivity.projectManagerId ? updatedActivity.projectManagerId : undefined,
            colourId: updatedActivity.colourId ? updatedActivity.colourId : undefined,
            aTypeId: updatedActivity.aTypeId ? updatedActivity.aTypeId : undefined,
            ended: updatedActivity.ended ? updatedActivity.ended : undefined,
            where: { id: id }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })

    let activity = await Activity
        .findOne({
            where: { id: id },
            include: ['tasks', 'projectManager', 'users']
        })
        .then((activity) => {
            if (activity) {
                return activity
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ activity });
}

exports.delete = async (req, res) => {
    let { id } = req.params;

    try {
        const result = await sequelize.transaction(async (t) => {

            await sequelize
                .query("DELETE e.* FROM events e INNER JOIN tasks t ON e.taskId = t.id WHERE t.activityId = ?",
                    { replacements: [id] },
                    { transaction: t })

            await sequelize
                .query("DELETE ta.* FROM tasksAssignments ta INNER JOIN tasks t ON ta.taskId = t.id WHERE t.activityId = ?",
                    { replacements: [id] },
                    { transaction: t })

            await Task
                .destroy(
                    {
                        where: { activityId: id }
                    }, { transaction: t })

            await ActivitiesAssignment
                .destroy(
                    {
                        where: { activityId: id }
                    }, { transaction: t })

            await Activity
                .destroy(
                    {
                        where: { id: id }
                    }, { transaction: t })
        });
        res.status(200).json({ success: 'reussi' })
    } catch (error) {
        res.status(422).json({ error });
    }
}