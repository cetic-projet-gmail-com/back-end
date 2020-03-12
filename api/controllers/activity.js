const { Activity } = require(`${process.cwd()}/sequelize`)

exports.findById = async (req, res) => {
    let { id } = req.params;
    let activity = await Activity
        .findOne({
            where: { id: id },
            include: ['projectManager', 'tasks', 'colour', 'type']
        })
        .then((activity) => {
            if (activity) {
                return { activity: activity }
            }
        })
        .catch((err) => {
            console.log(`The following error occured : ${err}`);
        })
    res.status(200).json(activity);
}

exports.find = async (req, res) => {
    let activities = await Activity
        .findAll({
            include: ['projectManager', 'colour', 'type']
        })
        .then((activities) => {
            if (activities.length > 0) {
                return { activities: activities }
            }
        })
        .catch((err) => {
            console.log(`The following error has occured : ${err}`);
        })
    res.status(200).json(activities)
}

exports.create = async (req, res) => {
    let newActivity = req.body;
    await Activity
        .create({
            name: newActivity.name,
            description: newActivity.description,
            projectManagerId: newActivity.projectManagerId,
            colourId: newActivity.colourId,
            aTypeId: newActivity.aTypeId,
            ended: newActivity.ended
        })
        .then((activity) => {
            this.newActivity = activity;
        })
        .catch((err) => {
            console.log(`The following error has occured : ${err}`);
        })

    res.status(200).json(newActivity);
}

exports.update = async (req, res) => {
    let updatedActivity = req.body;
    let { id } = req.params;

    await Activity.update({
        name: updatedActivity.name ? updatedActivity.name : undefined,
        description: updatedActivity.description ? updatedActivity.description : undefined,
        projectManagerId: updatedActivity.projectManagerId ? updatedActivity.projectManagerId : undefined,
        colourId: updatedActivity.colourId ? updatedActivity.colourId : undefined,
        aTypeId: updatedActivity.aTypeId ? updatedActivity.aTypeId : undefined,
        ended: updatedActivity.ended ? updatedActivity.ended : undefined,
        where: { id, id }
    })
        .catch((err) => {
            console.log(`The following error has occured : ${err}`);
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
        .catch((err) => {
            console.log(`The following error has occured : ${err}`);
        })
    res.status(200).json(activity);
}