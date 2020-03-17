const { Department } = require(`${process.cwd()}/sequelize`);

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

exports.create = async (req, res) => {
    let newDepartment = req.body;
    await Department
        .create({
            name: newDepartment.name,
            responsibleId: newDepartment.responsibleId
        })
        .then((department) => {
            newDepartment = department
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json(newDepartment);
}

exports.update = async (req, res) => {
    let updatedDepartment = req.body;
    let { id } = req.params;

    await Department
        .update({
            name: updatedDepartment.name ? updatedDepartment.name : undefined,
            responsibleId: updatedDepartment.responsibleId ? updatedDepartment.responsibleId : undefined,
            where: { id: id }
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })

    let department = await Department
        .findOne({
            where: { id: id },
            include: ['responsible', 'employees']
        })
        .then((department) => {
            if (department) {
                return department
            }
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })

    res.status(200).json(department)
}