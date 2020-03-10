const { getYear, getISOWeek, formatISO9075, setISOWeek, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } = require('date-fns')



/*returns an array with a startDate and an endDate for a day,
week(by week index) and month. If all parameters are undefined,
returns the start and the end of the current week*/
exports.getPeriod = (year, month, week, day) => {
    year = year ? year : getYear(Date.now());
    week = week ? week : getISOWeek(Date.now())
    let startDate;
    let endDate;
    if (day) {
        startDate = formatISO9075(startOfDay(new Date(year, month, day)))
        endDate = formatISO9075(endOfDay(new Date(year, month, day)))
    } else if (month) {
        startDate = formatISO9075(startOfMonth(new Date(year, month)))
        endDate = formatISO9075(endOfMonth(new Date(year, month)))
    } else {
        startDate = formatISO9075(startOfWeek(setISOWeek(new Date(year, 0, 0), week), { weekStartsOn: 1 }))
        endDate = formatISO9075(endOfWeek(new Date(startDate), { weekStartsOn: 1 }))
    }
    return {startDate, endDate}
}