const { User, Department, Role } = require('../../sequelize');

exports.findById = async (req, res) => {
    let { id } = req.params;
    let department = await Department
        .findOne({
            where: { id: id },
            include: ['responsible', 'employees']
        })
        .then((department) => {
            if (department) {
                return department;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    res.status(200).json({ department })
}

exports.find = async (req, res) => {
    let departments = await Department
        .findAll({
            include: ['responsible']
        })
        .then((departments) => {
            if (departments.length > 0) {
                return { departments: departments }
            }
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json(departments);
}