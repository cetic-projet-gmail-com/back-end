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

exports.create = async (req, res) => {
    let newEvent = req.body;
    console.log(newEvent.startAt);
    await Event
    .create({
        taskId: newEvent.taskId,
        userId: newEvent.userId,
        startAt:newEvent.startAt,
        endAt: newEvent.endAt,
        description: newEvent.description
    })
    .then((event) => {
        this.newEvent = event;
    })
    .catch((err) => {
        res.status(500).json({ error: err })
    })
res.status(200).json(newEvent);
}