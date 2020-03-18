const { Department, User, sequelize } = require(`${process.cwd()}/sequelize`);

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
    let department = await Department
        .create({
            name: newDepartment.name,
            responsibleId: newDepartment.responsibleId
        })
        .then((department) => {
            return department
        })
        .catch((err) => {
            console.log(`The following error has occured: ${err}`);
        })
    res.status(200).json({ department });
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

exports.delete = async (req, res) => {
    let { id } = req.params;
    try {
        const result = await sequelize.transaction(async (t) => {

            await User
                .update({
                    departmentId: null
                },
                    {
                        where: { departmentId: id }
                    }, { transaction: t })

            await Department
                .destroy(
                    {
                        where: { id: id }
                    }, { transaction: t })
        });
        res.status(200).json({ success: 'reussi' })
    } catch (error) {
        res.status(422).json(error);
    }
}