const fs = require('fs');
let { startOfMonth, endOfMonth, getISOWeeksInYear, setISOWeek, getWeek, format, endOfWeek, startOfWeek, addDays, getWeekYear, getISOWeeksInYear, formatISO9075 } = require('date-fns');
let resErrors = require(process.cwd() + '/api/helpers/res-errors');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize')
const { User, Task, Activity, Event } = require(`${process.cwd()}/sequelize`)
const periodHelper = require(`${process()}/api/helpers/period-helper`)

exports.find = async (req, res) => {

    let display = req.query.display || 'week';
    let month = (parseInt(req.query.month) > 0 && 13 > parseInt(req.query.month)) ? parseInt(req.query.month) : undefined;
    let periodStart;
    let periodEnd;
    let weeksInYear = getISOWeeksInYear(req.query.year || Date.now())

    switch (display) {
        case 'day':
            if (req.query.week > 0 || weeksInYear >= req.query.week) {
                periodStart = formatISO9075(startOfWeek(setISOWeek(Date.now(), parseInt(req.query.week)), { weekStartsOn: 1 }))
                periodEnd = formatISO9075(endOfWeek(periodStart, { weekStartsOn: 1 }))
            } else {
                //need to return an error to indicate the week query was wrong
            }
            break
        case 'week':
            if (req.query.week > 0 || weeksInYear >= req.query.week) {
                periodStart = formatISO9075(startOfWeek(setISOWeek(Date.now(), parseInt(req.query.week)), { weekStartsOn: 1 }))
                periodEnd = formatISO9075(endOfWeek(periodStart, { weekStartsOn: 1 }))
            } else {
                //need to return an error to indicate the week query was wrong
            }
            break
        case 'month':
            if (month >= 0 || month < 12) {
                periodStart = formatISO9075(startOfMonth(setISOWeek(Date.now(), parseInt(req.query.week)), { weekStartsOn: 1 }))
                periodEnd = formatISO9075(endOfMonth(periodStart))
            } else {
                //need to return an error to indicate the month query was wrong
            }
            break
        default:
            break
    }

    let userId = req.payload.id;
    let home = {}

    let periodStart = formatISO9075(startOfWeek(Date.now(), { weekStartsOn: 1 }))
    let periodEnd = formatISO9075(endOfWeek(Date.now(), { weekStartsOn: 1 }))
    //methode pour recuperer une date de la semaine passee par son index/52
    //let weekdate = setISOWeek(Date.now(), 10)

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
                    [Op.between]: [periodStart, periodEnd]
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

    res.status(200).json(home);
    // if (req.query.display === "day") {
    //     let dateFormat = 'dd-MM-yyyy';
    //     let day = req.query.date ? urlDate(req.query.date) : today;

    //     //? JSPlus A QUOI ca sert les links? let dayFormated = format(new Date(day), dateFormat);
    //     function urlDate(date) {
    //         date = date.split('-');
    //         return date[2] + "-" + date[1] + "-" + date[0];
    //     }

    // } else if (req.query.display === "month") {
    //     let month = req.query.month ? parseInt(req.query.month) - 1 : today.getMonth();
    //     let year = req.query.year ? parseInt(req.query.year) : today.getFullYear();


    // } else {
    //     let weekNumber = req.query.week ? parseInt(req.query.week) : getWeek(today);
    //     let year = req.query.year ? parseInt(req.query.year) : today.getFullYear();
    // }

    // let err = "dfhkqdfl";
    // if (err) { return resErrors(req, res, err)}
    // else {
    //     res.json({
    //         "data": {
    //             "activities": "user_activities",
    //             "tasks": "user_tasks",
    //             "events": "user_events"
    //         }
    //     });
    // }

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
    }
    */
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