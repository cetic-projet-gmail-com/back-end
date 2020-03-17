
const { validationResult } = require('express-validator');
const { Op } = require('sequelize')
const resErrors = require(process.cwd() + '/api/helpers/res-errors');
const { User, Activity, Event } = require(`${process.cwd()}/sequelize`)
const periodHelper = require(`${process.cwd()}/api/helpers/period-helper`)

exports.find = async (req, res) => {
    let userId = req.payload.id;
    let home = {};
    let { startDate, endDate } = periodHelper.getPeriod(req.query.year, req.query.month, req.query.week, req.query.day);

    let activities = await User
        .findOne({
            where: { id: userId },
            include: {
                model: Activity,
                as: 'activities',
                where: { ended: false },
                include: [{
                    model: Task,
                    as: 'tasks'
                }, 'colour']
            }
        })
        .then((user) => {
            if (user.activities.length > 0) {
                return user.activities;
            } else {
                return [];
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err })
        })

    home['activities'] = activities;

    let events = await Event
        .findAll({
            where: {
                userId: userId, startAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })
        .then((events) => {
            if (events.length > 0) {
                return events;
            } else {
                return [];
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    home['events'] = events
    home['display'] = {
        startDate,
        endDate
    }

    res.status(200).json({ data: home });
}

exports.createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resErrors(req, res, errors.array());
    }
    req.body['userId'] = req.payload.id;
    await Event.create(req.body)
        .then(event => {
            return res.status(200).json({ event: event.dataValues });
        }).catch(err => {
            return resErrors(req, res, err);
        })

    // let body = req.body;

    //*let user_id = req.payload.id;
    /* CHAMPS
    let newEvent = {
        "duration": end - start,
        "start": formatISO9075(start),
        "end": formatISO9075(end),
        "created": formatISO9075(Date.now()),
        "updated": formatISO9075(Date.now()),
        "description": body.description,
        "user_id": user,
        "tasks_id": body.tasks_id
    }*/
}

exports.updateEvent = async (req, res) => {
    //*let user_id zzzs= req.payload.id;
    let { startAt, endAt, description } = req.body;
    // let body = req.body;
    await Event.findOne({ where: { id: req.params.id } })
        .then(event => {
            if (event) {
                event.update({
                    startAt,
                    endAt,
                    description
                });
                return res.status(200).json({ event: event.dataValues });
            }
            return resErrors(req, res, 'event not found');
        }).catch(err => {
            return resErrors(req, res, err);
        })



    /* CHAMPS
    let eventModified = {
        "id": event.id,
        "duration": duration,
        "start": formatISO9075(start),
        "end": formatISO9075(end),
        "created": event.created,
        "updated": formatISO9075(Date.now()),
        "description": body.description ? body.description: event.description,
        "user_id": event.user_id,
        "tasks_id": event.tasks_id
    }
        */
    res.json({ "infos": "event modified", "data": "event modified" });
}

exports.deleteEvent = async (req, res) => {
    // let user_id = req.payload.id;
    await Event.findOne({ where: { id: req.params.id } })
        .then(event => {
            if (event) {
                event.destroy();
                return res.status(200).json({ "infos": "event deleted" });
            }
            return resErrors(req, res, 'event not found');
        }).catch(err => {
            return resErrors(req, res, err);
        });
}