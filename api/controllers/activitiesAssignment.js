const { ActivitiesAssignment } = require(`${process.cwd()}/sequelize`)

exports.findByUserId = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let activityAssignment = await ActivitiesAssignment
        .findAll({
            where: { userId: id },
            include: ['activity']
        })
        .then((activityAssignment) => {
            if (activityAssignment) {
                return activityAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err, check: 'check' })
        })
    res.status(200).json(activityAssignment);
}

exports.findOne = async (req, res) => {
    let { userId, activityId } = req.params;
    let activityAssignment = await ActivitiesAssignment
        .findOne({
            where:
            {
                userId: userId,
                activityId: activityId
            },
            include: ['activity', 'user']
        })
        .then((activityAssignment) => {
            if (activityAssignment) {
                return activityAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(activityAssignment);
}

exports.create = async (req, res) => {
    let newActivitiesAssignment = req.body;
    let activityAssignment = await ActivitiesAssignment
        .create({
            userId: newActivitiesAssignment.userId ? newActivitiesAssignment.userId : undefined,
            activityId: newActivitiesAssignment.activityId ? newActivitiesAssignment.activityId : undefined,
        })
        .then((activityAssignment) => {
            if (activityAssignment) {
                return activityAssignment;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({activityAssignment})
}

exports.delete = async (req, res) => {
    let { userId, activityId } = req.params;
    let qqch = await ActivitiesAssignment
        .destroy({
            where:
            {
                userId: userId,
                activityId: activityId
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