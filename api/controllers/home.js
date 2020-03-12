
const { validationResult } = require('express-validator');
const { Op } = require('sequelize')
const resErrors = require(process.cwd() + '/api/helpers/res-errors');
const { User, Activity, Event } = require(`${process.cwd()}/sequelize`)
const periodHelper = require(`${process.cwd()}/api/helpers/period-helper`)

exports.find = async (req, res) => {
    let userId = req.payload.id;
    let home = {};
    let {startDate, endDate} = periodHelper.getPeriod(req.query.year, req.query.month, req.query.week, req.query.day);
    console.log(startDate, endDate);
    let user = await User
        .findOne({
            where: { id: userId },
            include: ['role', 'department']
        })
        .then((user) => {
            if (user) {
                return user;
            }
            else {
                return {};
            }
        })

    home['user'] = user

    let activities = await Activity
        .findAll({
            where: { id: userId, ended: false },
            include: ['tasks', 'colour', 'type']
        })
        .then((activities) => {
            if (activities.length > 0) {
                return activities;
            } else {
                return [];
            }
        })
        .catch((err) => {
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

    res.status(200).json(home);
}

exports.createEvent = async (req, res) => {
    //*let user_id = req.payload.id;
    let body = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resErrors(req, res, errors.array());
    }
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
    //*let user_id = req.payload.id;
    let body = req.body;
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
    let user_id = req.payload.id;

    res.json({ "infos": "event.description" + " deleted" });
}