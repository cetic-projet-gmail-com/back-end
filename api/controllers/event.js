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
                return { event: event }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(event);
}

exports.find = async (req, res) => {
    let events = await Event
        .findAll({
            include: ['activity']
        })
        .then((events) => {
            if (events.length > 0) {
                return { events: events }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(events);
}

exports.update = async (req, res) => {
    let { id } = req.params;
    let updatedEvent = req.params;

    await Event
        .update({

            where: { id: id }
        })
        .then((event) => {
            if (event) {
                return event
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    res.status(200).json(updatedEvent)
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
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({event});
}