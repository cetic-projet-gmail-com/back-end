const { Event } = require(`${process.cwd()}/sequelize`);

exports.findById = async (req, res) => {
    let { id } = req.params;
    let event = await Event
        .findOne({
            where: { id: id },
            include: ['activity', 'user', 'task']
        })
        .then((event) => {
            if (event) {
                return event
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({ event });
}

exports.find = async (req, res) => {
    let events = await Event
        .findAll({
            include: ['task']
        })
        .then((events) => {
            if (events.length > 0) {
                return events;
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ events });
}

exports.create = async (req, res) => {
    let newEvent = req.body;
    let event = await Event
        .create({
            taskId: newEvent.taskId,
            userId: newEvent.userId,
            startAt: newEvent.startAt,
            endAt: newEvent.endAt,
            description: newEvent.description
        })
        .then((event) => {
            if (event) {
                return event;
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ event });
}