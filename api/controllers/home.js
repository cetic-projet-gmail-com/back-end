const fs = require('fs');
let { getWeek, format, addDays, getWeekYear, getISOWeeksInYear } = require('date-fns');
let resErrors = require(process.cwd() + '/api/helpers/res-errors');
const {  validationResult } = require('express-validator');
exports.findEvents = async (req, res) => {
    
    //*let user_id = req.payload.id;
    let today = new Date(Date.now());

    if (req.query.display === "day") {
        let dateFormat = 'dd-MM-yyyy';
        let day = req.query.date ? urlDate(req.query.date) : today;
        
        //? JSPlus A QUOI ca sert les links? let dayFormated = format(new Date(day), dateFormat);
        function urlDate(date) {
            date = date.split('-');
            return date[2] + "-" + date[1] + "-" + date[0];
        }

    } else if (req.query.display === "month") {
        let month = req.query.month ? parseInt(req.query.month) - 1 : today.getMonth();
        let year = req.query.year ? parseInt(req.query.year) : today.getFullYear();


    } else {
        let weekNumber = req.query.week ? parseInt(req.query.week) : getWeek(today);
        let year = req.query.year ? parseInt(req.query.year) : today.getFullYear();
    }
    
    let err = "dfhkqdfl";
    if (err) { return resErrors(req, res, err)}
    else {
        res.json({
            "data": {
                "activities": "user_activities",
                "tasks": "user_tasks",
                "events": "user_events"
            }
        });
    }

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
    res.json({ "infos": "event modified", "data": "event modified"});
}

exports.deleteEvent = async (req, res) => {
    let user_id = req.payload.id;

    res.json({ "infos": "event.description" + " deleted" });
}