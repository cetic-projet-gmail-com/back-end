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